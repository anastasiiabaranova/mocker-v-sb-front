import {createFeatureSelector, createSelector} from '@ngrx/store';
import {getRouterSelectors, RouterReducerState} from '@ngrx/router-store';

import {GRAPHQL_HISTORY_FEATURE} from './graphql-history-store.feature';
import {GraphQLHistoryState} from './graphql-history.state';

const routerFeature = createFeatureSelector<RouterReducerState>('router');
const {selectRouteParam} = getRouterSelectors(routerFeature);

const graphQLHistoryFeature = createFeatureSelector<GraphQLHistoryState>(
	GRAPHQL_HISTORY_FEATURE
);

const getServiceId = selectRouteParam('id');
const getPaging = createSelector(graphQLHistoryFeature, ({paging}) => paging);
const getHistory = createSelector(graphQLHistoryFeature, ({items}) => items);

export const fromGraphQLHistory = {
	getServiceId,
	getPaging,
	getHistory,
};
