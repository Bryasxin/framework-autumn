import type { Constructor } from "type-fest";
import { COMPONENT_CONSTRUCTOR_DEPENDENCIES, COMPONENT_NAME, COMPONENT_SCOPE } from "../metadata";

/**
 * 检测目标是不是组件
 * @param target 目标
 */
export const isComponent = <T extends object>(target: T) => {
	return Reflect.hasMetadata(COMPONENT_NAME, target);
};

/**
 * 获取组件名称
 * @param target 目标
 * @throws {TypeError} 如果不是组件
 */
export const getComponentName = <T extends object>(target: T): string => {
	if (!isComponent(target)) throw new TypeError();
	return Reflect.getMetadata(COMPONENT_NAME, target);
};

/**
 * 获取组件作用域
 * @param target 目标
 * @throws {TypeError} 如果不是组件
 */
export const getComponentScope = <T extends object>(target: T) => {
	if (!isComponent(target)) throw new TypeError();
	return Reflect.getMetadata(COMPONENT_SCOPE, target);
};

/**
 * 获取组件依赖
 * @param target 目标
 * @throws {TypeError} 如果不是组件
 */
export const getComponentConstructorDependencies = <T extends object>(target: T): Constructor<unknown>[] => {
	if (!isComponent(target)) throw new TypeError();
	return Reflect.getMetadata(COMPONENT_CONSTRUCTOR_DEPENDENCIES, target) ?? [];
};
