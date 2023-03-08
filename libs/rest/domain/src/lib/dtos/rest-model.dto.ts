export type RestModelDto = Readonly<{
	modelId: string;
	name: string;
	schema: string;
	description?: string;
}>;
