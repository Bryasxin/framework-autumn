import {
	addComponentExtension,
	type IComponentExtension,
} from "./component-extension-guard";
import "reflect-metadata";
import {
	COMPONENT_CONSTRUCTOR_DEPENDENCIES,
	COMPONENT_NAME,
	COMPONENT_SCOPE,
} from "../metadata";
import { ComponentScope } from "./component-scope";

/**
 * 添加组件扩展
 * @param extension 组件扩展
 */
export const AddExtension = (
	extension: IComponentExtension,
): ClassDecorator => {
	return <T extends Function>(target: T) => {
		addComponentExtension(target, extension);
	};
};

/**
 * 标记为组件
 * @param options 组件选项
 */
export const Component = (options: {
	scope?: ComponentScope;
	name?: string;
}): ClassDecorator => {
	return <T extends Function>(target: T) => {
		const name = options.name ?? target.name;
		const scope = options.scope ?? ComponentScope.Singleton;
		const constructorDependencies = Reflect.getMetadata(
			"design:paramtypes",
			target,
		);

		Reflect.defineMetadata(COMPONENT_NAME, name, target);
		Reflect.defineMetadata(COMPONENT_SCOPE, scope, target);
		Reflect.defineMetadata(
			COMPONENT_CONSTRUCTOR_DEPENDENCIES,
			constructorDependencies,
			target,
		);
	};
};
