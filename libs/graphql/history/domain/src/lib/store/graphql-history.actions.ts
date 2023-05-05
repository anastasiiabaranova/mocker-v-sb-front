import {createAction, props} from '@ngrx/store';
import {
	GraphQLHistoryItemDto,
	GraphQLHistoryPagingDto,
	GraphQLHistoryParamsDto,
} from '../dtos';
import {SortingOrder} from '../enums';

const changePage = createAction(
	'[GRAPHQL] Change Page',
	props<{page: number}>()
);
const changePageSize = createAction(
	'[GRAPHQL] Change Page Size',
	props<{pageSize: number}>()
);
const searchHistory = createAction(
	'[GRAPHQL] Search History',
	props<{params: GraphQLHistoryParamsDto}>()
);
const changeSortingOrder = createAction(
	'[GRAPHQL] Change Sorting Order',
	props<{sortingOrder: SortingOrder}>()
);
const setHistory = createAction(
	'[GRAPHQL] Set History',
	props<{items: ReadonlyArray<GraphQLHistoryItemDto>}>()
);
const setPaging = createAction(
	'[GRAPHQL] Set Paging',
	props<{paging: GraphQLHistoryPagingDto}>()
);
const historyLoadFailure = createAction('[GRAPHQL] History Load Failure');
const resetState = createAction('[GRAPHQL] Reset State');

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
