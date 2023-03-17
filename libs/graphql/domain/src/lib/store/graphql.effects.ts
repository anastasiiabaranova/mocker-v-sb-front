import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
	map,
	catchError,
	switchMap,
	tap,
	withLatestFrom,
	filter,
} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {NotificationsFacade} from '@mocker/shared/utils';
import {TuiNotification} from '@taiga-ui/core';
import {Store} from '@ngrx/store';
import {ROUTER_NAVIGATED} from '@ngrx/router-store';

import {GraphQLApiService} from '../services';
import {graphQLActions} from './graphql.actions';
import {Router} from '@angular/router';
import {fromGraphQL} from './graphql.selectors';
import {tuiIsPresent} from '@taiga-ui/cdk';

@Injectable()
export class GraphQLEffects {
	loadServices$ = createEffect(() =>
		this.actions$.pipe(
			ofType(graphQLActions.loadServices),
			switchMap(({search}) =>
				this.apiService.getAllServices(search).pipe(
					map(services => graphQLActions.setServices({services})),
					catchError(() => {
						this.notificationsFacade.showNotification({
							label: 'Не удалось загрузить сервисы',
							content: 'Попробуйте еще раз позже',
							status: TuiNotification.Error,
						});
						return of(graphQLActions.setServices({services: null}));
					})
				)
			)
		)
	);

	openService$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ROUTER_NAVIGATED),
			withLatestFrom(this.store$.select(fromGraphQL.getServiceId)),
			map(([, id]) => id),
			filter(tuiIsPresent),
			switchMap(id =>
				this.apiService.getService(id).pipe(
					map(service => graphQLActions.setCurrentService({service})),
					catchError(() => {
						this.notificationsFacade.showNotification({
							label: 'Не удалось открыть сервис',
							content: 'Попробуйте еще раз позже',
							status: TuiNotification.Error,
						});
						return EMPTY;
					})
				)
			)
		)
	);

	createService$ = createEffect(() =>
		this.actions$.pipe(
			ofType(graphQLActions.createService),
			switchMap(({service}) =>
				this.apiService.createService(service).pipe(
					tap(() =>
						this.notificationsFacade.showNotification({
							content: 'Сервис успешно создан',
							status: TuiNotification.Success,
						})
					),
					tap(id => this.router.navigate(['graphql', id])),
					map(id =>
						graphQLActions.serviceCreated({
							service: {
								...service,
								id,
							},
						})
					),
					catchError(() => {
						this.notificationsFacade.showNotification({
							label: 'Не удалось создать сервис',
							content: 'Попробуйте еще раз позже',
							status: TuiNotification.Error,
						});
						return of(graphQLActions.dialogRequestFailure());
					})
				)
			)
		)
	);

	editService$ = createEffect(() =>
		this.actions$.pipe(
			ofType(graphQLActions.editService),
			switchMap(({service}) =>
				this.apiService.editService(service).pipe(
					tap(() =>
						this.notificationsFacade.showNotification({
							content: 'Сервис успешно отредактирован',
							status: TuiNotification.Success,
						})
					),
					map(() => graphQLActions.serviceEdited({service})),
					catchError(() => {
						this.notificationsFacade.showNotification({
							label: 'Не удалось отредактировать сервис',
							content: 'Попробуйте еще раз позже',
							status: TuiNotification.Error,
						});
						return of(graphQLActions.dialogRequestFailure());
					})
				)
			)
		)
	);

	deleteService$ = createEffect(() =>
		this.actions$.pipe(
			ofType(graphQLActions.deleteService),
			switchMap(({id}) =>
				this.apiService.deleteService(id).pipe(
					tap(() =>
						this.notificationsFacade.showNotification({
							content: 'Сервис удален',
							status: TuiNotification.Success,
						})
					),
					tap(() => this.router.navigate(['graphql'])),
					map(() => graphQLActions.serviceDeleted({id})),
					catchError(() => {
						this.notificationsFacade.showNotification({
							label: 'Не удалось удалить сервис',
							content: 'Попробуйте еще раз позже',
							status: TuiNotification.Error,
						});
						return EMPTY;
					})
				)
			)
		)
	);

	createMock$ = createEffect(() =>
		this.actions$.pipe(
			ofType(graphQLActions.createMock),
			switchMap(({mock}) =>
				this.apiService.createMock(mock).pipe(
					map(() => graphQLActions.mockCreated({mock})),
					catchError(() => {
						this.notificationsFacade.showNotification({
							label: 'Не удалось создать мок',
							content: 'Попробуйте еще раз позже',
							status: TuiNotification.Error,
						});
						return of(graphQLActions.dialogRequestFailure());
					})
				)
			)
		)
	);

	deleteMock$ = createEffect(() =>
		this.actions$.pipe(
			ofType(graphQLActions.deleteMock),
			switchMap(({id}) =>
				this.apiService.deleteMock(id).pipe(
					map(() => graphQLActions.mockDeleted({id})),
					catchError(() => {
						this.notificationsFacade.showNotification({
							label: 'Не удалось удалить шаблон мока',
							content: 'Попробуйте еще раз позже',
							status: TuiNotification.Error,
						});
						return EMPTY;
					})
				)
			)
		)
	);

	constructor(
		private readonly actions$: Actions,
		private readonly store$: Store,
		private readonly apiService: GraphQLApiService,
		private readonly notificationsFacade: NotificationsFacade,
		private readonly router: Router
	) {}
}
