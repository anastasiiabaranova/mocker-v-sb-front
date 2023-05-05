import {Action, createReducer, on} from '@ngrx/store';
import {GraphQLHistoryState} from './graphql-history.state';
import {graphQLHistoryActions} from './graphql-history.actions';

const initialState: GraphQLHistoryState = {
	totalItems: null,
	totalPages: null,
	page: 0,
	pageSize: 10,
	timeRange: {},
	loading: false,
};

const graphQLReducer = createReducer(
	initialState,
	on(graphQLHistoryActions.changePage, (state, {page}) => ({
		...state,
		page,
		loading: true,
	})),
	on(graphQLHistoryActions.changePageSize, (state, {pageSize}) => ({
		...state,
		pageSize,
		loading: true,
	})),
	on(graphQLHistoryActions.changeTimeRange, (state, timeRange) => ({
		...state,
		timeRange,
		loading: true,
	})),
	on(graphQLHistoryActions.changeSortingOrder, (state, {sortingOrder}) => ({
		...state,
		sortingOrder,
		loading: true,
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
