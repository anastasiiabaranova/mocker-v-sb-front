export type RestMockDto = Readonly<{
	mockId: string;
	name: string;
	path: string;
	method: string;
	requestModelId?: string;
	responseModelId: string;
	requestHeaders: ReadonlyArray<string>;
	responseHeaders: ReadonlyArray<string>;
	queryParams: ReadonlyArray<string>;
	pathParams: ReadonlyArray<string>;
	description?: string;
}>;
