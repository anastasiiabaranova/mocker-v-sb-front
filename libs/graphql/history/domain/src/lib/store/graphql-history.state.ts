import {GraphQLHistoryItemDto} from '../dtos';
import {SortingOrder} from '../enums';

export interface GraphQLHistoryState {
	totalItems: number | null;
	totalPages: number | null;
	page: number;
	pageSize: number;
	timeRange: {from?: string; to?: string};
	sortingOrder?: SortingOrder;
	items?: ReadonlyArray<GraphQLHistoryItemDto> | null;
	loading: boolean;
}
