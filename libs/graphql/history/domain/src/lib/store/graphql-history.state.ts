import {GraphQLHistoryItemDto} from '../dtos';

export interface GraphQLHistoryState {
	totalItems: number | null;
	totalPages: number | null;
	page: number;
	pageSize: number;
	timeRange: {from?: string; to?: string};
	items: ReadonlyArray<GraphQLHistoryItemDto> | null;
}
