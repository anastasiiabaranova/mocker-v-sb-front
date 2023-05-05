export type GraphQLHistoryItemDto = Readonly<{
	id: number;
	createdAt: string;
	expirationDate: string;
	redirected: boolean;
	request: string;
	response: string;
	isError: boolean;
}>;
