export type GraphQLServiceDto = Readonly<{
	id?: number;
	name: string;
	location: string;
	ttl?: number;
	delay?: number;
	makeRealCall?: boolean;
	useDefaultMock?: boolean;
}>;
