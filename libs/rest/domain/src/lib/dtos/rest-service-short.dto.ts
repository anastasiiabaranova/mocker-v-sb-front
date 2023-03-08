export type RestServiceShortDto = Readonly<{
	name: string;
	path: string;
	totalMocks: number;
	totalModels: number;
	url?: string;
}>;
