import {GraphQLHistoryItemDto} from '../dtos';
import {SortingOrder} from '../enums';

export interface GraphQLHistoryState {
	totalItems: number | null;
	totalPages: number | null;
	page: number;
	pageSize: number;
	from?: string;
	to?: string;
	isError?: boolean;
	redirected?: boolean;
	sortingOrder?: SortingOrder;
	items?: ReadonlyArray<GraphQLHistoryItemDto> | null;
	loading: boolean;
}
