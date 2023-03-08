import {RestModelShortDto} from './rest-model-short.dto';

export type RestModelListDto = Readonly<{
	models: ReadonlyArray<RestModelShortDto>;
}>;
