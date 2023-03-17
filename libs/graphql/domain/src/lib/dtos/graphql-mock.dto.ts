export type GraphQLMockDto = Readonly<{
	id?: string;
	name: string;
	expirationDate?: string;
	delay?: number;
	enable: boolean;
	request: string;
	response: string;
	serviceId: string;
}>;
