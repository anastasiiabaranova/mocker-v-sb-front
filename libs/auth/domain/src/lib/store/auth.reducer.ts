import {Action, createReducer, on} from '@ngrx/store';
import {AuthState} from './auth.state';
import {authActions} from './auth.actions';

const initialState: AuthState = {
	email: null,
	error: null,
	loading: false,
};

const authReducer = createReducer(
	initialState,
	on(authActions.login, state => ({
		...state,
		error: null,
		loading: true,
	})),
	on(authActions.signup, state => ({
		...state,
		error: null,
		loading: true,
	})),
	on(authActions.loginSuccess, (state, {email}) => ({
		...state,
		email,
		error: null,
		loading: false,
	})),
	on(authActions.logout, state => ({
		...state,
		email: null,
	})),
	on(authActions.requestFailure, (state, {error}) => ({
		...state,
		error,
		email: null,
		loading: false,
	})),
	on(authActions.resetError, state => ({
		...state,
		error: null,
	}))
);

export function reducer(state: AuthState | undefined, action: Action) {
	return authReducer(state, action);
}
