import {createAction, props} from '@ngrx/store';
import {AuthDto} from '../dtos';

const login = createAction('[AUTH] Login', props<{data: AuthDto}>());
const signup = createAction('[AUTH] Sign Up', props<{data: AuthDto}>());
const logout = createAction('[AUTH] Logout');
const loginSuccess = createAction(
	'[AUTH] Login Success',
	props<{email: string}>()
);
const logoutSuccess = createAction('[AUTH] Logout Success');
const requestFailure = createAction(
	'[AUTH] Request Failure',
	props<{error: string | null}>()
);
const resetError = createAction('[AUTH] Reset Error');

export const authActions = {
	login,
	signup,
	logout,
	loginSuccess,
	logoutSuccess,
	requestFailure,
	resetError,
};
