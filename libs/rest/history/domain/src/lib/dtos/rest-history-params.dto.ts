import {RestSortingOrder} from '../enums';

export type RestHistoryParamsDto = Readonly<{
	page?: number;
	pageSize?: number;
	from?: number;
	to?: number;
	search?: string;
	statusCodes?: string[];
	responseSources?: string[];
	requestMethods?: string[];
	timeSort?: RestSortingOrder;
}>;
