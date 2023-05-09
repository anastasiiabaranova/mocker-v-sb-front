import {Action, createReducer, on} from '@ngrx/store';
import {RestHistoryState} from './rest-history.state';
import {restHistoryActions} from './rest-history.actions';
import {RestHistoryParamsDto} from '../dtos';

function searchChanged(
	state: RestHistoryState,
	params: RestHistoryParamsDto
): boolean {
	return (
		params.from !== state.from ||
		params.to !== state.to ||
		params.search !== state.search
	);
}

const initialState: RestHistoryState = {
	totalItems: null,
	totalPages: null,
	page: 0,
	pageSize: 10,
	loading: false,
};

const restHistoryReducer = createReducer(
	initialState,
	on(restHistoryActions.changePage, (state, {page}) => ({
		...state,
		page,
		loading: state.page !== page,
	})),
	on(restHistoryActions.changePageSize, (state, {pageSize}) => ({
		...state,
		pageSize,
		loading: state.pageSize !== pageSize,
	})),
	on(restHistoryActions.searchHistory, (state, {params}) => ({
		...state,
		...params,
		page: 0,
		loading: searchChanged(state, params),
	})),
	on(restHistoryActions.changeSortingOrder, (state, {sortingOrder}) => ({
		...state,
		sortingOrder,
		loading: state.sortingOrder !== sortingOrder,
	})),
	on(restHistoryActions.setPaging, (state, {paging}) => ({
		...state,
		...paging,
	})),
	on(restHistoryActions.setHistory, (state, {items}) => ({
		...state,
		items,
		loading: false,
	})),
	on(restHistoryActions.historyLoadFailure, state => ({
		...state,
		items: state.items || null,
		loading: false,
	})),
	on(restHistoryActions.resetState, () => initialState)
);

export function reducer(state: RestHistoryState | undefined, action: Action) {
	return restHistoryReducer(state, action);
}
