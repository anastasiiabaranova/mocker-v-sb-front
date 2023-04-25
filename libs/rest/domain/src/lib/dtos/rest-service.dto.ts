import {RestMockShortDto} from './rest-mock-short.dto';
import {RestModelShortDto} from './rest-model-short.dto';

export type RestServiceDto = Readonly<{
	name: string;
	path: string;
	mocks?: ReadonlyArray<RestMockShortDto>;
	models?: ReadonlyArray<RestModelShortDto>;
	description?: string;
	url?: string;
	expirationTime?: number;
	isProxyEnabled: boolean;
}>;
