import {ResponseType} from '../enums';

export type RestModelDto = Readonly<{
	modelId?: string;
	name: string;
	description?: string;
	responseContent: string;
	responseType: ResponseType;
}>;
