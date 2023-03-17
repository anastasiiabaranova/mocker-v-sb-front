import {createFeatureSelector, createSelector} from '@ngrx/store';
import {getRouterSelectors, RouterReducerState} from '@ngrx/router-store';

import {GRAPHQL_FEATURE} from './graphql-store.feature';
import {GraphQLState} from './graphql.state';

const routerFeature = createFeatureSelector<RouterReducerState>('router');

const {selectRouteParam} = getRouterSelectors(routerFeature);
const getServiceId = selectRouteParam('id');

const graphQLFeature = createFeatureSelector<GraphQLState>(GRAPHQL_FEATURE);

const getServices = createSelector(graphQLFeature, ({services}) => services);
const getCurrentService = createSelector(
	graphQLFeature,
	({currentService}) => currentService
);
const getMocks = createSelector(graphQLFeature, ({mocks}) => mocks);
const getDialogLoading = createSelector(
	graphQLFeature,
	({dialogLoading}) => dialogLoading
);

export const fromGraphQL = {
	getServices,
	getCurrentService,
	getServiceId,
	getMocks,
	getDialogLoading,
};
