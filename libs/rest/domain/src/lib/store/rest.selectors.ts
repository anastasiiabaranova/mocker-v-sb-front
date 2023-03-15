import {createFeatureSelector, createSelector} from '@ngrx/store';
import {getRouterSelectors, RouterReducerState} from '@ngrx/router-store';

import {REST_FEATURE} from './rest-store.feature';
import {RestState} from './rest.state';

const routerFeature = createFeatureSelector<RouterReducerState>('router');

const {selectRouteParam} = getRouterSelectors(routerFeature);
const getServicePath = selectRouteParam('path');

const restFeature = createFeatureSelector<RestState>(REST_FEATURE);

const getServices = createSelector(restFeature, ({services}) => services);
const getCurrentService = createSelector(
	restFeature,
	({currentService}) => currentService
);
const getMocks = createSelector(restFeature, ({mocks}) => mocks);
const getModels = createSelector(restFeature, ({models}) => models);
const getDialogLoading = createSelector(
	restFeature,
	({dialogLoading}) => dialogLoading
);

export const fromRest = {
	getServices,
	getCurrentService,
	getServicePath,
	getMocks,
	getModels,
	getDialogLoading,
};
