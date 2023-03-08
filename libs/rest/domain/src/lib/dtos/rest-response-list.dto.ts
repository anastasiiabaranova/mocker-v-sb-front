import {RestResponseShortDto} from './rest-response-short.dto';

export type RestResponseListDto = Readonly<{
	responses: ReadonlyArray<RestResponseShortDto>;
}>;
