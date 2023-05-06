export type RestHistoryPagingDto = Readonly<{
	totalItems: number;
	totalPages: number;
	page: number;
	pageSize: number;
}>;
