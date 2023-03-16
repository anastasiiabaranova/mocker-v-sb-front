import {RequestParamDto} from './request-param.dto';

export type RestResponseDto = Readonly<{
	responseId?: string;
	name: string;
	requestHeaders: ReadonlyArray<string>;
	statusCode: ReadonlyArray<string>;
	responseHeaders: ReadonlyArray<string>;
	queryParams: ReadonlyArray<RequestParamDto>;
	pathParams: ReadonlyArray<RequestParamDto>;
	responseContent: string;
	description?: string;
}>;
