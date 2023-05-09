import {createAction, props} from '@ngrx/store';
import {
	RestHistoryItemDto,
	RestHistoryPagingDto,
	RestHistoryParamsDto,
} from '../dtos';
import {RestSortingOrder} from '../enums';

const changePage = createAction(
	'[REST_HISTORY] Change Page',
	props<{page: number}>()
);
const changePageSize = createAction(
	'[REST_HISTORY] Change Page Size',
	props<{pageSize: number}>()
);
const searchHistory = createAction(
	'[REST_HISTORY] Search History',
	props<{params: RestHistoryParamsDto}>()
);
const changeSortingOrder = createAction(
	'[REST_HISTORY] Change Sorting Order',
	props<{sortingOrder: RestSortingOrder}>()
);
const setHistory = createAction(
	'[REST_HISTORY] Set History',
	props<{items: ReadonlyArray<RestHistoryItemDto>}>()
);
const setPaging = createAction(
	'[REST_HISTORY] Set Paging',
	props<{paging: RestHistoryPagingDto}>()
);
const historyLoadFailure = createAction('[REST_HISTORY] History Load Failure');
const resetState = createAction('[REST_HISTORY] Reset State');

export const restHistoryActions = {
	changePage,
	changePageSize,
	searchHistory,
	changeSortingOrder,
	setHistory,
	setPaging,
	historyLoadFailure,
	resetState,
};
