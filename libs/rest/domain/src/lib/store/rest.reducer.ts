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
		service,
	}))
);

export function reducer(state: RestState | undefined, action: Action) {
	return restReducer(state, action);
}