import {RestMockShortDto} from './rest-mock-short.dto';

export type RestMockListDto = Readonly<{
	mocks: ReadonlyArray<RestMockShortDto>;
}>;
