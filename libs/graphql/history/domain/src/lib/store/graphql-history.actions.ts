import {createAction, props} from '@ngrx/store';
import {
	GraphQLHistoryItemDto,
	GraphQLHistoryPagingDto,
	GraphQLHistoryParamsDto,
} from '../dtos';
import {SortingOrder} from '../enums';

const changePage = createAction(
	'[GRAPHQL_HISTORY] Change Page',
	props<{page: number}>()
);
const changePageSize = createAction(
	'[GRAPHQL_HISTORY] Change Page Size',
	props<{pageSize: number}>()
);
const searchHistory = createAction(
	'[GRAPHQL_HISTORY] Search History',
	props<{params: GraphQLHistoryParamsDto}>()
);
const changeSortingOrder = createAction(
	'[GRAPHQL_HISTORY] Change Sorting Order',
	props<{sortingOrder: SortingOrder}>()
);
const setHistory = createAction(
	'[GRAPHQL_HISTORY] Set History',
	props<{items: ReadonlyArray<GraphQLHistoryItemDto>}>()
);
const setPaging = createAction(
	'[GRAPHQL_HISTORY] Set Paging',
	props<{paging: GraphQLHistoryPagingDto}>()
);
const historyLoadFailure = createAction(
	'[GRAPHQL_HISTORY] History Load Failure'
);
const resetState = createAction('[GRAPHQL_HISTORY] Reset State');

export const graphQLHistoryActions = {
	changePage,
	changePageSize,
	searchHistory,
	changeSortingOrder,
	setHistory,
	setPaging,
	historyLoadFailure,
	resetState,
};
