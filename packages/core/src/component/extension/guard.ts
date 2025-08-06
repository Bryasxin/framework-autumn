import { COMPONENT_EXTENSION } from "../../metadata";
import type { IComponentExtension } from "./type";

/**
 * 获取组件所有扩展
 * @param target 组件
 */
export const getComponentExtensions = <T extends object>(
	target: T,
): IComponentExtension[] => {
	return Reflect.getMetadata(COMPONENT_EXTENSION, target) ?? [];
};

/**
 * 设置组件扩展(覆盖)
 * @param target 组件
 * @param extensions 扩展
 */
export const setComponentExtensions = <T extends object>(
	target: T,
	extensions: IComponentExtension[],
) => {
	Reflect.defineMetadata(COMPONENT_EXTENSION, extensions, target);
};

/**
 * 添加组件扩展
 * @param target 组件
 * @param extension 扩展
 */
export const addComponentExtension = <T extends object>(
	target: T,
	extension: IComponentExtension,
) => {
	const extensions = getComponentExtensions(target);
	extensions.push(extension);
	setComponentExtensions(target, extensions);
};
