import {SortingOrder} from '../enums';

export type GraphQLHistoryParamsDto = Readonly<{
	page?: number;
	pageSize?: number;
	from?: string;
	to?: string;
	isError?: boolean;
	redirected?: boolean;
	sortingOrder?: SortingOrder;
}>;
