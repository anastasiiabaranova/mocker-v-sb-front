import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, catchError, switchMap, tap} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {NotificationsFacade} from '@mocker/shared/utils';
import {TuiNotification} from '@taiga-ui/core';

import {AuthApiService} from '../services';
import {authActions} from './auth.actions';
import {Router} from '@angular/router';

const REFRESH_TOKEN = 'refreshToken';
const ACCESS_TOKEN = 'accessToken';
const LOGIN_ERROR = 'Неверный email или пароль';
const SIGNUP_ERROR = 'Этот email уже используется';

@Injectable()
export class AuthEffects {
	login$ = createEffect(() =>
		this.actions$.pipe(
			ofType(authActions.login),
			switchMap(({data}) =>
				this.apiService.login(data).pipe(
					tap(({authenticationToken, refreshToken}) => {
						this.saveToStorage(ACCESS_TOKEN, authenticationToken);
						this.saveToStorage(REFRESH_TOKEN, refreshToken);
					}),
					map(({email}) => authActions.loginSuccess({email})),
					catchError(({status}) => {
						if (status === 404) {
							return of(
								authActions.requestFailure({error: LOGIN_ERROR})
							);
						}

						this.notificationsFacade.showNotification({
							label: 'Не удалось войти',
							content: 'Попробуйте еще раз позже',
							status: TuiNotification.Error,
						});
						return of(authActions.requestFailure({error: null}));
					})
				)
			)
		)
	);

	signup$ = createEffect(() =>
		this.actions$.pipe(
			ofType(authActions.signUp),
			switchMap(({data}) =>
				this.apiService.signup(data).pipe(
					map(() => authActions.login({data})),
					catchError(({status}) => {
						if (status === 409) {
							return of(
								authActions.requestFailure({
									error: SIGNUP_ERROR,
								})
							);
						}

						this.notificationsFacade.showNotification({
							label: 'Не удалось создать аккаунт',
							content: 'Попробуйте еще раз позже',
							status: TuiNotification.Error,
						});
						return of(authActions.requestFailure({error: null}));
					})
				)
			)
		)
	);

	logout$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(authActions.logout),
				switchMap(() =>
					this.apiService.logout().pipe(
						tap(() => {
							this.removeFromStorage(ACCESS_TOKEN);
							this.removeFromStorage(REFRESH_TOKEN);
							this.router.navigate(['signin']);
						}),
						catchError(() => {
							this.notificationsFacade.showNotification({
								label: 'Не удалось выйти',
								content: 'Попробуйте еще раз позже',
								status: TuiNotification.Error,
							});
							return EMPTY;
						})
					)
				)
			),
		{dispatch: false}
	);

	constructor(
		private readonly actions$: Actions,
		private readonly apiService: AuthApiService,
		private readonly notificationsFacade: NotificationsFacade,
		private readonly router: Router
	) {}

	get refreshToken(): string | null {
		return localStorage.getItem(REFRESH_TOKEN);
	}

	private saveToStorage(key: string, value: string) {
		localStorage.setItem(key, value);
	}

	private removeFromStorage(key: string) {
		localStorage.removeItem(key);
	}
}
