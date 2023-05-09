import {RestMethod, RestResponseSource} from '../enums';
import {RestHeaderDto} from './rest-header.dto';

export type RestHistoryItemDto = Readonly<{
	id: number;
	method: RestMethod;
	queryUrl: string;
	responseUrl: string;
	responseSource: RestResponseSource;
	statusCode: number;
	requestHeaders: ReadonlyArray<RestHeaderDto>;
	responseHeaders: ReadonlyArray<RestHeaderDto>;
	responseTime: number;
	response: string;
}>;
