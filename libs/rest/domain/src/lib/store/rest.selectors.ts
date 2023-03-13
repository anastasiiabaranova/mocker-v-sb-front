import {createFeatureSelector, createSelector} from '@ngrx/store';

import {REST_FEATURE} from './rest-store.feature';
import {RestState} from './rest.state';

const restFeature = createFeatureSelector<RestState>(REST_FEATURE);

const getServices = createSelector(restFeature, ({services}) => services);
const getCurrentService = createSelector(
	restFeature,
	({currentService}) => currentService
);

export const fromRest = {
	getServices,
	getCurrentService,
};
