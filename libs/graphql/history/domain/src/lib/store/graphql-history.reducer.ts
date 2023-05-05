import {Action, createReducer, on} from '@ngrx/store';
import {GraphQLHistoryState} from './graphql-history.state';
import {graphQLHistoryActions} from './graphql-history.actions';
import {GraphQLHistoryParamsDto} from '../dtos';

function searchChanged(
	state: GraphQLHistoryState,
	params: GraphQLHistoryParamsDto
): boolean {
	return (
		params.from !== state.from ||
		params.to !== state.to ||
		params.redirected !== state.redirected ||
		params.isError !== state.isError
	);
}

const initialState: GraphQLHistoryState = {
	totalItems: null,
	totalPages: null,
	page: 0,
	pageSize: 10,
	loading: false,
};

const graphQLReducer = createReducer(
	initialState,
	on(graphQLHistoryActions.changePage, (state, {page}) => ({
		...state,
		page,
		loading: state.page !== page,
	})),
	on(graphQLHistoryActions.changePageSize, (state, {pageSize}) => ({
		...state,
		pageSize,
		loading: state.pageSize !== pageSize,
	})),
	on(graphQLHistoryActions.searchHistory, (state, {params}) => ({
		...state,
		...params,
		loading: searchChanged(state, params),
	})),
	on(graphQLHistoryActions.changeSortingOrder, (state, {sortingOrder}) => ({
		...state,
		sortingOrder,
		loading: state.sortingOrder !== sortingOrder,
	})),
	on(graphQLHistoryActions.setPaging, (state, {paging}) => ({
		...state,
		...paging,
	})),
	on(graphQLHistoryActions.setHistory, (state, {items}) => ({
		...state,
		items,
		loading: false,
	})),
	on(graphQLHistoryActions.historyLoadFailure, state => ({
		...state,
		items: state.items || null,
		loading: false,
	})),
	on(graphQLHistoryActions.resetState, () => initialState)
);

export function reducer(
	state: GraphQLHistoryState | undefined,
	action: Action
) {
	return graphQLReducer(state, action);
}
