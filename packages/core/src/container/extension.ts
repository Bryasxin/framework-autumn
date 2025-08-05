export interface IContainerExtension {
	preInitializeComponent?(): Promise<void>;
	postInitializeComponent?<T>(component: T): Promise<T>;
	preDestroyComponent?<T>(component: T): Promise<T>;
	postDestroyComponent?(): Promise<void>;
}
