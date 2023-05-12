import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, catchError, switchMap, tap} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {NotificationsFacade} from '@mocker/shared/utils';
import {TuiNotification} from '@taiga-ui/core';
import {SHA1} from 'crypto-js';

import {AuthApiService, TokensStorageService} from '../services';
import {authActions} from './auth.actions';

const LOGIN_ERROR = 'Неверный email или пароль';
const SIGNUP_ERROR = 'Этот email уже используется';

@Injectable()
export class AuthEffects {
	login$ = createEffect(() =>
		this.actions$.pipe(
			ofType(authActions.login),
			map(({data}) => ({
				email: data.email,
				password: SHA1(data.password).toString(),
			})),
			switchMap(data =>
				this.apiService.login(data).pipe(
					tap(({accessToken, refreshToken}) => {
						this.tokensStorageService.accessToken = accessToken;
						this.tokensStorageService.refreshToken = refreshToken;

						const redirect =
							this.activatedRoute.snapshot.queryParams[
								'redirect'
							] || '';

						this.router.navigateByUrl(decodeURIComponent(redirect));
					}),
					map(({email}) => authActions.loginSuccess({email})),
					catchError(({status}) => {
						if (status === 401) {
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
			ofType(authActions.signup),
			map(({data}) => ({
				data: {
					email: data.email,
					password: SHA1(data.password).toString(),
				},
				password: data.password,
			})),
			switchMap(({data, password}) =>
				this.apiService.signup(data).pipe(
					map(() => authActions.login({data: {...data, password}})),
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
				map(() => this.tokensStorageService.refreshToken!),
				switchMap(refreshToken =>
					this.apiService.logout({refreshToken}).pipe(
						tap(() => {
							this.tokensStorageService.clearTokens();
							this.router.navigate(['login']);
						}),
						catchError(() => {
							this.notificationsFacade.showNotification({
								label: 'Не удалось выйти',
								content: 'Попробуйте еще раз позже',
								status: TuiNotification.Error,
							});

							if (!refreshToken) {
								this.tokensStorageService.clearTokens();
								this.router.navigate(['login']);
							}

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
		private readonly tokensStorageService: TokensStorageService,
		private readonly notificationsFacade: NotificationsFacade,
		private readonly activatedRoute: ActivatedRoute,
		private readonly router: Router
	) {}
}
