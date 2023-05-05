import {Action, createReducer, on} from '@ngrx/store';
import {GraphQLHistoryState} from './graphql-history.state';
import {graphQLHistoryActions} from './graphql-history.actions';

const initialState: GraphQLHistoryState = {
	totalItems: null,
	totalPages: null,
	page: 0,
	pageSize: 10,
	timeRange: {},
	items: null,
};

const graphQLReducer = createReducer(
	initialState,
	on(graphQLHistoryActions.changePage, (state, {page}) => ({
		...state,
		page,
	})),
	on(graphQLHistoryActions.changePageSize, (state, {pageSize}) => ({
		...state,
		pageSize,
	})),
	on(graphQLHistoryActions.changeTimeRange, (state, timeRange) => ({
		...state,
		timeRange,
	})),
	on(graphQLHistoryActions.setPaging, (state, {paging}) => ({
		...state,
		...paging,
	})),
	on(graphQLHistoryActions.setHistory, (state, {items}) => ({
		...state,
		items,
	})),
	on(graphQLHistoryActions.resetState, () => initialState)
);

export function reducer(
	state: GraphQLHistoryState | undefined,
	action: Action
) {
	return graphQLReducer(state, action);
}
