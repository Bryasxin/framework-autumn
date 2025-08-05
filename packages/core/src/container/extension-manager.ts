import type { IContainerExtension } from "./extension";

export class ContainerExtensionManager {
	private extensions: IContainerExtension[] = [];

	async preInitializeComponent(): Promise<void> {
		for (const extension of this.extensions) {
			if (!extension.preInitializeComponent) continue;

			await extension.preInitializeComponent();
		}
	}

	async postDestroyComponent(): Promise<void> {
		for (const extension of this.extensions) {
			if (!extension.postDestroyComponent) continue;

			await extension.postDestroyComponent();
		}
	}

	async preDestroyComponent<T>(component: T): Promise<T> {
		let result = component;

		for (const extension of this.extensions) {
			if (!extension.preDestroyComponent) continue;

			result = await extension.preDestroyComponent(result);
		}

		return result;
	}

	async postInitializeComponent<T>(component: T): Promise<T> {
		let result = component;

		for (const extension of this.extensions) {
			if (!extension.postInitializeComponent) continue;

			result = await extension.postInitializeComponent(result);
		}

		return result;
	}
}
