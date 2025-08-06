import { ContainerExtensionManager } from "./extension/manager";
import { getComponentConstructorDependencies, getComponentName, getComponentScope } from "../component";
import type { Constructor } from "type-fest";
import { ComponentScope } from "../component/scope";
import { getComponentExtensions } from "../component/extension/guard";

// biome-ignore lint/complexity/noStaticOnlyClass: 核心容器组件需要单例化
export class Container {
	private static extensionManager = new ContainerExtensionManager();
	private static registry: Map<string, Constructor<object>> = new Map();
	private static instances: Map<string, object> = new Map();

	/**
	 * 注册组件
	 * @param component 组件构造函数
	 * @throws {Error} 已经注册该组件
	 * @throws {TypeError} 传入参数不是组件
	 */
	public static register<T extends object>(component: Constructor<T>) {
		const componentName = getComponentName(component);
		if (Container.registry.has(componentName)) {
			throw new Error();
		}
		Container.registry.set(componentName, component);
	}

	/**
	 * 获取组件
	 * @param component 组件构造函数
	 */
	public static async get<T>(component: Constructor<T>): Promise<T> {
		const componentName = getComponentName(component);
		const scope = getComponentScope(component);

		switch (scope) {
			case ComponentScope.Prototype: {
				return Container.createInstance(component);
			}
			case ComponentScope.Singleton: {
				if (Container.instances.has(componentName)) {
					// biome-ignore lint/style/noNonNullAssertion: 已经检查是否存在
					return Container.instances.get(componentName)! as T;
				}
				const instance = Container.createInstance(component);
				Container.instances.set(componentName, instance);
				return instance;
			}
		}
		throw new Error(`Unreachable code`);
	}

	/**
	 * 自动解析构造函数并创建实例
	 * @param component 组件构造函数
	 * @returns
	 */
	private static async createInstance<T>(component: Constructor<T>): Promise<T> {
		await Container.extensionManager.preInitializeComponent();

		const dependencies = await Promise.all(
			getComponentConstructorDependencies(component).map((dep) => Container.get(dep)),
		);

		let instance = new component(...dependencies);

		const extensions = getComponentExtensions(component);
		for (const extension of extensions) {
			if (extension.postInitialize) {
				await extension.postInitialize(instance);
			}
		}

		instance = await Container.extensionManager.postInitializeComponent(instance);
		return instance;
	}

	/**
	 * 清空依赖
	 */
	public static async clear() {
		for (const [componentName, component] of Container.instances.entries()) {
			let processedComponent: object = Container.extensionManager.preDestroyComponent(component);

			for (const extension of getComponentExtensions(processedComponent)) {
				if (extension.preDestroy) {
					processedComponent = await extension.preDestroy(processedComponent);
				}
			}

			await Container.extensionManager.postDestroyComponent();

			Container.instances.delete(componentName);
		}

		Container.registry.clear();
	}
}
