import {createFeatureSelector, createSelector} from '@ngrx/store';
import {getRouterSelectors, RouterReducerState} from '@ngrx/router-store';

import {REST_HISTORY_FEATURE} from './rest-history-store.feature';
import {RestHistoryState} from './rest-history.state';

const routerFeature = createFeatureSelector<RouterReducerState>('router');
const {selectRouteParam, selectQueryParam} = getRouterSelectors(routerFeature);

const restHistoryFeature =
	createFeatureSelector<RestHistoryState>(REST_HISTORY_FEATURE);

const getServiceId = selectRouteParam('id');
const getServicePath = selectQueryParam('path');
const getPage = createSelector(restHistoryFeature, ({page}) => page);
const getPageSize = createSelector(
	restHistoryFeature,
	({pageSize}) => pageSize
);
const getTotalItems = createSelector(
	restHistoryFeature,
	({totalItems}) => totalItems
);
const getFrom = createSelector(restHistoryFeature, ({from}) => from);
const getTo = createSelector(restHistoryFeature, ({to}) => to);
const getSearch = createSelector(restHistoryFeature, ({search}) => search);
const getHistory = createSelector(restHistoryFeature, ({items}) => items);
const getLoading = createSelector(restHistoryFeature, ({loading}) => loading);

export const fromRestHistory = {
	getServiceId,
	getServicePath,
	getPage,
	getPageSize,
	getTotalItems,
	getFrom,
	getTo,
	getSearch,
	getHistory,
	getLoading,
};
