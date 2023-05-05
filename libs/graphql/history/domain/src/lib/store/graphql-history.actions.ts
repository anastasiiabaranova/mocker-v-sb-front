import {createAction, props} from '@ngrx/store';
import {GraphQLHistoryItemDto, GraphQLHistoryPagingDto} from '../dtos';

const changePage = createAction(
	'[GRAPHQL] Change Page',
	props<{page: number}>()
);
const changePageSize = createAction(
	'[GRAPHQL] Change Page Size',
	props<{pageSize: number}>()
);
const changeTimeRange = createAction(
	'[GRAPHQL] Change Time Range',
	props<{from?: string; to?: string}>()
);
const setHistory = createAction(
	'[GRAPHQL] Set History',
	props<{items: ReadonlyArray<GraphQLHistoryItemDto>}>()
);
const setPaging = createAction(
	'[GRAPHQL] Set Paging',
	props<{paging: GraphQLHistoryPagingDto}>()
);
const resetState = createAction('[GRAPHQL] Reset State');

export const graphQLHistoryActions = {
	changePage,
	changePageSize,
	changeTimeRange,
	setHistory,
	setPaging,
	resetState,
};
