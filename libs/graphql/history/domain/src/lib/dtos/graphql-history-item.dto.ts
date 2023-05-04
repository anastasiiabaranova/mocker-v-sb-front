export type GraphQLHistoryItemDto = Readonly<{
	createdAt: string;
	expirationDate: string;
	redirected: boolean;
	request: string;
	response: string;
	isError: boolean;
}>;
