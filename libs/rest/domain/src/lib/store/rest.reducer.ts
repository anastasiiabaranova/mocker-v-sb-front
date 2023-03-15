import {Action, createReducer, on} from '@ngrx/store';
import {RestState} from './rest.state';
import {restActions} from './rest.actions';

const initialState: RestState = {};

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
	on(restActions.serviceCreated, (state, {service}) => ({
		...state,
		services: [service, ...(state.services || [])],
	}))
);

export function reducer(state: RestState | undefined, action: Action) {
	return restReducer(state, action);
}
