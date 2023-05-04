import {GraphQLHistoryItemDto} from './graphql-history-item.dto';
import {GraphQLHistoryPagingDto} from './graphql-history-paging.dto';

export type GraphQLHistoryDto = Readonly<{
	paging: GraphQLHistoryPagingDto;
	items: ReadonlyArray<GraphQLHistoryItemDto>;
}>;
