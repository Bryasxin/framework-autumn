export interface IComponentExtension {
	postInitialize?<T>(instance: T): Promise<T>;
	preDestroy?<T>(instance: T): Promise<T>;
}
