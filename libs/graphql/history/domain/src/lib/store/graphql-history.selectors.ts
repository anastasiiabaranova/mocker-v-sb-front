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
const getPage = createSelector(graphQLHistoryFeature, ({page}) => page);
const getPageSize = createSelector(
	graphQLHistoryFeature,
	({pageSize}) => pageSize
);
const getTotalItems = createSelector(
	graphQLHistoryFeature,
	({totalItems}) => totalItems
);
const getFrom = createSelector(graphQLHistoryFeature, ({from}) => from);
const getTo = createSelector(graphQLHistoryFeature, ({to}) => to);
const getRedirected = createSelector(
	graphQLHistoryFeature,
	({redirected}) => redirected
);
const getIsError = createSelector(
	graphQLHistoryFeature,
	({isError}) => isError
);
const getSortingOrder = createSelector(
	graphQLHistoryFeature,
	({sortingOrder}) => sortingOrder
);
const getHistory = createSelector(graphQLHistoryFeature, ({items}) => items);
const getLoading = createSelector(
	graphQLHistoryFeature,
	({loading}) => loading
);

export const fromGraphQLHistory = {
	getServiceId,
	getPage,
	getPageSize,
	getTotalItems,
	getFrom,
	getTo,
	getRedirected,
	getIsError,
	getSortingOrder,
	getHistory,
	getLoading,
};
