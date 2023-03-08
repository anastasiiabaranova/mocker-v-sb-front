import {RestServiceShortDto} from './rest-service-short.dto';

export type RestServiceListDto = Readonly<{
	services: ReadonlyArray<RestServiceShortDto>;
}>;
