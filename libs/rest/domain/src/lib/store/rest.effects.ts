import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, catchError, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {NotificationsFacade} from '@mocker/shared/utils';

import {RestServiceApiService} from '../services';
import {restActions} from './rest.actions';
import {TuiNotification} from '@taiga-ui/core';

@Injectable()
export class RestEffects {
	loadServices$ = createEffect(() =>
		this.actions$.pipe(
			ofType(restActions.loadServices),
			tap(console.log),
			switchMap(() =>
				this.serviceApiService.getAllServices().pipe(
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
			ofType(restActions.openService),
			switchMap(({path}) =>
				this.serviceApiService.getService(path).pipe(
					map(service => restActions.setCurrentService({service})),
					catchError(() => {
						this.notificationsFacade.showNotification({
							label: 'Не удалось открыть сервис',
							content: 'Попробуйте еще раз позже',
							status: TuiNotification.Error,
						});
						return of(
							restActions.setCurrentService({service: null})
						);
					})
				)
			)
		)
	);

	constructor(
		private readonly actions$: Actions,
		private readonly serviceApiService: RestServiceApiService,
		private readonly notificationsFacade: NotificationsFacade
	) {}
}
