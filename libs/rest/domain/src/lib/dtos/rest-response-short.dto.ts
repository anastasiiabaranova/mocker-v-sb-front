export type RestResponseShortDto = Readonly<{
	responseId: string;
	name: string;
	statusCode: number;
	fullPath: string;
	description?: string;
}>;
