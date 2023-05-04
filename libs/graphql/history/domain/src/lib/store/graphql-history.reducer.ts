import {Action, createReducer, on} from '@ngrx/store';
import {GraphQLHistoryState} from './graphql-history.state';
import {graphQLHistoryActions} from './graphql-history.actions';

const initialState: GraphQLHistoryState = {
	paging: null,
	items: null,
};

const graphQLReducer = createReducer(
	initialState,
	on(graphQLHistoryActions.setPaging, (state, {paging}) => ({
		...state,
		paging,
	})),
	on(graphQLHistoryActions.setHistory, (state, {items}) => ({
		...state,
		items,
	}))
);

export function reducer(
	state: GraphQLHistoryState | undefined,
	action: Action
) {
	return graphQLReducer(state, action);
}
