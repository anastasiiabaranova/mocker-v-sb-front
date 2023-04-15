import {createAction, props} from '@ngrx/store';
import {AuthDto} from '../dtos';

const login = createAction('[AUTH] Login', props<{data: AuthDto}>());
const signUp = createAction('[AUTH] Sign Up', props<{data: AuthDto}>());
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

export const authActions = {
	login,
	signUp,
	logout,
	loginSuccess,
	logoutSuccess,
	requestFailure,
};
