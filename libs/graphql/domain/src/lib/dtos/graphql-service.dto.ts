import {GraphQLMockDto} from './graphql-mock.dto';

export type GraphQLServiceDto = Readonly<{
	id?: string;
	name: string;
	expirationDate?: string;
	delay?: number;
	location: string;
	makeRealCall: boolean;
	useDefaultMock?: boolean;
	schema?: string;
	mocks?: ReadonlyArray<GraphQLMockDto>;
	storeHistory: boolean;
}>;
