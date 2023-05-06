export type RestHistoryParamsDto = Readonly<{
	page?: number;
	pageSize?: number;
	from?: number;
	to?: number;
	search?: string;
}>;
