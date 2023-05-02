import {RequestParamDto} from './request-param.dto';

export type RestResponseDto = Readonly<{
	responseId?: string;
	name: string;
	requestHeaders: ReadonlyArray<RequestParamDto>;
	statusCode: number;
	responseHeaders: ReadonlyArray<RequestParamDto>;
	queryParams: ReadonlyArray<RequestParamDto>;
	pathParams: ReadonlyArray<RequestParamDto>;
	responseContent: string;
	description?: string;
}>;
