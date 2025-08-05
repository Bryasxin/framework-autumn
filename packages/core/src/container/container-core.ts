import { ContainerExtensionManager } from "./extension-manager";
import {
	getComponentConstructorDependencies,
	getComponentName,
	getComponentScope,
} from "../component";
import type { Constructor } from "type-fest";
import { ComponentScope } from "../component/component-scope";
import { getComponentExtensions } from "../component/component-extension-guard";

export class Container {
	private extensionManager = new ContainerExtensionManager();
	private registry: Map<string, Constructor<unknown>> = new Map();
	private instances: Map<string, unknown> = new Map();

	/**
	 * 注册组件
	 * @param component 组件
	 * @throws {Error} 已经注册该组件
	 * @throws {TypeError} 传入参数不是组件
	 */
	public register<T>(component: Constructor<T>) {
		const componentName = getComponentName(component);
		if (this.registry.has(componentName)) {
			throw new Error();
		}
		this.registry.set(componentName, component);
	}

	public async get<T>(component: Constructor<T>): Promise<T> {
		const componentName = getComponentName(component);
		const scope = getComponentScope(component);

		switch (scope) {
			case ComponentScope.Prototype: {
				return this.createInstance(component);
			}
			case ComponentScope.Singleton: {
				if (this.instances.has(componentName)) {
					// biome-ignore lint/style/noNonNullAssertion: 已经检查是否存在
					return this.instances.get(componentName)! as T;
				}
				const instance = this.createInstance(component);
				this.instances.set(componentName, instance);
				return instance;
			}
		}
		throw new Error(`Unreachable code`);
	}

	private async createInstance<T>(component: Constructor<T>): Promise<T> {
		await this.extensionManager.preInitializeComponent();

		const dependencies = await Promise.all(
			getComponentConstructorDependencies(component).map((dep) =>
				this.get(dep),
			),
		);

		let instance = new component(...dependencies);

		const extensions = getComponentExtensions(component);
		for (const extension of extensions) {
			if (extension.postInitialize) {
				await extension.postInitialize(instance);
			}
		}

		instance = await this.extensionManager.postInitializeComponent(instance);
		return instance;
	}
}
