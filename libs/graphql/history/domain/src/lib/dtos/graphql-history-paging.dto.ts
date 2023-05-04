export type GraphQLHistoryPagingDto = Readonly<{
	totalItems: number;
	totalPages: number;
	page: number;
	pageSize: number;
}>;
