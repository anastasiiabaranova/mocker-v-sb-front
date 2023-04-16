import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthState} from './auth.state';
import {AUTH_FEATURE} from './auth-store.feature';

const authFeature = createFeatureSelector<AuthState>(AUTH_FEATURE);

const getEmail = createSelector(authFeature, ({email}) => email);
const getLoading = createSelector(authFeature, ({loading}) => loading);
const getError = createSelector(authFeature, ({error}) => error);

export const fromAuth = {
	getEmail,
	getLoading,
	getError,
};
