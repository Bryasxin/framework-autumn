import { addComponentExtension } from "./guard";
import type { IComponentExtension } from "./type";

/**
 * 添加组件扩展
 * @param extension 组件扩展
 */

export const AddExtension = (extension: IComponentExtension): ClassDecorator => {
	return <T extends Function>(target: T) => {
		addComponentExtension(target, extension);
	};
};
