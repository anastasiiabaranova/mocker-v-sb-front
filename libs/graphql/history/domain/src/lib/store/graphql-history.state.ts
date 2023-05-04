import {GraphQLHistoryItemDto, GraphQLHistoryPagingDto} from '../dtos';

export interface GraphQLHistoryState {
	paging: GraphQLHistoryPagingDto | null;
	items: ReadonlyArray<GraphQLHistoryItemDto> | null;
}
