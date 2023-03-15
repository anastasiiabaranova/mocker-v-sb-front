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

import {RestServiceApiService} from '../services';
import {restActions} from './rest.actions';
import {Router} from '@angular/router';
import {fromRest} from './rest.selectors';
import {tuiIsPresent} from '@taiga-ui/cdk';

@Injectable()
export class RestEffects {
	loadServices$ = createEffect(() =>
		this.actions$.pipe(
			ofType(restActions.loadServices),
			switchMap(({search}) =>
				this.serviceApiService.getAllServices(search).pipe(
					map(services => restActions.setServices({services})),
					catchError(() => {
						this.notificationsFacade.showNotification({
							label: 'Не удалось загрузить сервисы',
							content: 'Попробуйте еще раз позже',
							status: TuiNotification.Error,
						});
						return of(restActions.setServices({services: null}));
					})
				)
			)
		)
	);

	openService$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ROUTER_NAVIGATED),
			withLatestFrom(this.store$.select(fromRest.getServicePath)),
			map(([, path]) => path),
			filter(tuiIsPresent),
			switchMap(path =>
				this.serviceApiService.getService(path).pipe(
					map(service => restActions.setCurrentService({service})),
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
			ofType(restActions.createService),
			switchMap(({service}) =>
				this.serviceApiService.createService(service).pipe(
					tap(() => this.router.navigate(['rest-api', service.path])),
					map(() => restActions.serviceCreated({service})),
					catchError(() => {
						this.notificationsFacade.showNotification({
							label: 'Не удалось создать сервис',
							content: 'Попробуйте еще раз позже',
							status: TuiNotification.Error,
						});
						return of(restActions.serviceRequestFailure());
					})
				)
			)
		)
	);

	editService$ = createEffect(() =>
		this.actions$.pipe(
			ofType(restActions.editService),
			switchMap(({path, service}) =>
				this.serviceApiService.editService(path, service).pipe(
					tap(() => this.router.navigate(['rest-api', service.path])),
					map(() => restActions.serviceEdited({path, service})),
					catchError(() => {
						this.notificationsFacade.showNotification({
							label: 'Не удалось отредактировать сервис',
							content: 'Попробуйте еще раз позже',
							status: TuiNotification.Error,
						});
						return of(restActions.serviceRequestFailure());
					})
				)
			)
		)
	);

	deleteService$ = createEffect(() =>
		this.actions$.pipe(
			ofType(restActions.deleteService),
			switchMap(({path}) =>
				this.serviceApiService.deleteService(path).pipe(
					tap(() => this.router.navigate(['rest-api'])),
					map(() => restActions.serviceDeleted({path})),
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

	constructor(
		private readonly actions$: Actions,
		private readonly store$: Store,
		private readonly serviceApiService: RestServiceApiService,
		private readonly notificationsFacade: NotificationsFacade,
		private readonly router: Router
	) {}
}
