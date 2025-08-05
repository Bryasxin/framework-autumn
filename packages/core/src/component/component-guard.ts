import type { Constructor } from "type-fest";
import {
	COMPONENT_DEPENDENCIES,
	COMPONENT_NAME,
	COMPONENT_SCOPE,
} from "../metadata";

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
 * 添加组件依赖
 * @param target 目标
 * @throws {TypeError} 如果不是组件
 */
export const addComponentDependencies = <T extends Constructor<unknown>>(
	target: T,
) => {
	if (!isComponent(target)) throw new TypeError();
	const dependencies = getComponentDependencies(target);
	dependencies.push(target);
	setComponentDependencies(target, dependencies);
};

/**
 * 设置组件依赖(覆盖)
 * @param target 目标
 * @param dependencies 依赖
 * @throws {TypeError} 如果不是组件
 */
export const setComponentDependencies = <T extends Constructor<unknown>>(
	target: T,
	dependencies: T[],
) => {
	if (!isComponent(target)) throw new TypeError();
	Reflect.defineMetadata(COMPONENT_DEPENDENCIES, dependencies, target);
};

/**
 * 获取组件依赖
 * @param target 目标
 * @throws {TypeError} 如果不是组件
 */
export const getComponentDependencies = <T extends object>(
	target: T,
): Constructor<unknown>[] => {
	if (!isComponent(target)) throw new TypeError();
	return Reflect.getMetadata(COMPONENT_DEPENDENCIES, target) ?? [];
};
