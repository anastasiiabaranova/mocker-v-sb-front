import {Action, createReducer, on} from '@ngrx/store';
import {RestState} from './rest.state';
import {restActions} from './rest.actions';

const initialState: RestState = {
	serviceInProgress: false,
};

const restReducer = createReducer(
	initialState,
	on(restActions.setServices, (state, {services}) => ({
		...state,
		services,
	})),
	on(restActions.setCurrentService, (state, {service}) => ({
		...state,
		currentService: service,
	})),
	on(restActions.createService, state => ({
		...state,
		serviceInProgress: true,
	})),
	on(restActions.serviceCreated, (state, {service}) => ({
		...state,
		services: [service, ...(state.services || [])],
		serviceInProgress: false,
	})),
	on(restActions.editService, state => ({
		...state,
		serviceInProgress: true,
	})),
	on(restActions.serviceEdited, (state, {path, service}) => ({
		...state,
		services: state.services?.map(item =>
			item.path === path ? service : item
		),
		serviceInProgress: false,
	})),
	on(restActions.serviceDeleted, (state, {path}) => ({
		...state,
		services: state.services?.filter(
			({path: servicePath}) => servicePath !== path
		),
	})),
	on(restActions.serviceRequestFailure, state => ({
		...state,
		serviceInProgress: false,
	}))
);

export function reducer(state: RestState | undefined, action: Action) {
	return restReducer(state, action);
}
