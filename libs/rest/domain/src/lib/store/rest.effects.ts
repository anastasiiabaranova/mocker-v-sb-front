import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
	map,
	catchError,
	switchMap,
	tap,
	withLatestFrom,
	filter,
	mergeMap,
} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {NotificationsFacade} from '@mocker/shared/utils';
import {TuiNotification} from '@taiga-ui/core';
import {Store} from '@ngrx/store';
import {ROUTER_NAVIGATED} from '@ngrx/router-store';

import {
	RestMockApiService,
	RestModelApiService,
	RestServiceApiService,
} from '../services';
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

	loadMocks$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ROUTER_NAVIGATED),
			withLatestFrom(this.store$.select(fromRest.getServicePath)),
			map(([, path]) => path),
			filter(tuiIsPresent),
			switchMap(path =>
				this.mockApiService.getAllMocks(path).pipe(
					map(mocks => restActions.setMocks({mocks})),
					catchError(() => {
						this.notificationsFacade.showNotification({
							label: 'Не удалось загрузить моки',
							content: 'Попробуйте еще раз позже',
							status: TuiNotification.Error,
						});
						return EMPTY;
					})
				)
			)
		)
	);

	loadModels$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ROUTER_NAVIGATED),
			withLatestFrom(this.store$.select(fromRest.getServicePath)),
			map(([, path]) => path),
			filter(tuiIsPresent),
			switchMap(path =>
				this.modelApiService.getAllModels(path).pipe(
					map(models => restActions.setModels({models})),
					catchError(() => {
						this.notificationsFacade.showNotification({
							label: 'Не удалось загрузить модели',
							content: 'Попробуйте еще раз позже',
							status: TuiNotification.Error,
						});
						return EMPTY;
					})
				)
			)
		)
	);

	updateMocks$ = createEffect(() =>
		this.actions$.pipe(
			ofType(restActions.updateMocks),
			switchMap(({path}) =>
				this.mockApiService.getAllMocks(path).pipe(
					map(mocks => restActions.setMocks({mocks})),
					catchError(() => {
						this.notificationsFacade.showNotification({
							label: 'Не удалось обновить список моков',
							content: 'Попробуйте еще раз позже',
							status: TuiNotification.Error,
						});
						return EMPTY;
					})
				)
			)
		)
	);

	updateModels$ = createEffect(() =>
		this.actions$.pipe(
			ofType(restActions.updateModels),
			switchMap(({path}) =>
				this.modelApiService.getAllModels(path).pipe(
					map(models => restActions.setModels({models})),
					catchError(() => {
						this.notificationsFacade.showNotification({
							label: 'Не удалось обновить список моделей',
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
					tap(() =>
						this.notificationsFacade.showNotification({
							content: 'Сервис успешно создан',
							status: TuiNotification.Success,
						})
					),
					tap(() => this.router.navigate(['rest-api', service.path])),
					map(() => restActions.serviceCreated({service})),
					catchError(() => {
						this.notificationsFacade.showNotification({
							label: 'Не удалось создать сервис',
							content: 'Попробуйте еще раз позже',
							status: TuiNotification.Error,
						});
						return of(restActions.dialogRequestFailure());
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
					tap(() =>
						this.notificationsFacade.showNotification({
							content: 'Сервис успешно отредактирован',
							status: TuiNotification.Success,
						})
					),
					tap(() => this.router.navigate(['rest-api', service.path])),
					map(() => restActions.serviceEdited({path, service})),
					catchError(() => {
						this.notificationsFacade.showNotification({
							label: 'Не удалось отредактировать сервис',
							content: 'Попробуйте еще раз позже',
							status: TuiNotification.Error,
						});
						return of(restActions.dialogRequestFailure());
					})
				)
			)
		)
	);

	setServiceAfterEdit$ = createEffect(() =>
		this.actions$.pipe(
			ofType(restActions.serviceEdited),
			filter(({path, service}) => path === service.path),
			map(({service}) => restActions.setCurrentService({service}))
		)
	);

	deleteService$ = createEffect(() =>
		this.actions$.pipe(
			ofType(restActions.deleteService),
			switchMap(({path}) =>
				this.serviceApiService.deleteService(path).pipe(
					tap(() =>
						this.notificationsFacade.showNotification({
							content: 'Сервис удален',
							status: TuiNotification.Success,
						})
					),
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

	createMock$ = createEffect(() =>
		this.actions$.pipe(
			ofType(restActions.createMock),
			switchMap(({path, mock}) =>
				this.mockApiService.createMock(path, mock).pipe(
					mergeMap(() => [
						restActions.mockCreated({path, mock}),
						restActions.updateMocks({path}),
					]),
					catchError(() => {
						this.notificationsFacade.showNotification({
							label: 'Не удалось создать шаблон мока',
							content: 'Попробуйте еще раз позже',
							status: TuiNotification.Error,
						});
						return of(restActions.dialogRequestFailure());
					})
				)
			)
		)
	);

	editMock$ = createEffect(() =>
		this.actions$.pipe(
			ofType(restActions.editMock),
			switchMap(({path, mock}) =>
				this.mockApiService.editMock(path, mock).pipe(
					mergeMap(() => [
						restActions.mockEdited({path, mock}),
						restActions.updateMocks({path}),
					]),
					catchError(() => {
						this.notificationsFacade.showNotification({
							label: 'Не удалось обновить шаблон мока',
							content: 'Попробуйте еще раз позже',
							status: TuiNotification.Error,
						});
						return of(restActions.dialogRequestFailure());
					})
				)
			)
		)
	);

	deleteMock$ = createEffect(() =>
		this.actions$.pipe(
			ofType(restActions.deleteMock),
			switchMap(({path, mockId}) =>
				this.mockApiService.deleteMock(path, mockId).pipe(
					map(() => restActions.mockDeleted({mockId})),
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

	deleteAllMocks$ = createEffect(() =>
		this.actions$.pipe(
			ofType(restActions.deleteAllMocks),
			switchMap(({path}) =>
				this.mockApiService.deleteAllMocks(path).pipe(
					map(() => restActions.allMocksDeleted()),
					tap(() => {
						this.notificationsFacade.showNotification({
							content: 'Все шаблоны моков удалены',
							status: TuiNotification.Success,
						});
					}),
					catchError(() => {
						this.notificationsFacade.showNotification({
							label: 'Не удалось удалить шаблоны моков',
							content: 'Попробуйте еще раз позже',
							status: TuiNotification.Error,
						});
						return EMPTY;
					})
				)
			)
		)
	);

	createModel$ = createEffect(() =>
		this.actions$.pipe(
			ofType(restActions.createModel),
			switchMap(({path, model}) =>
				this.modelApiService.createModel(path, model).pipe(
					mergeMap(() => [
						restActions.modelCreated({path, model}),
						restActions.updateModels({path}),
					]),
					catchError(() => {
						this.notificationsFacade.showNotification({
							label: 'Не удалось создать модель',
							content: 'Попробуйте еще раз позже',
							status: TuiNotification.Error,
						});
						return of(restActions.dialogRequestFailure());
					})
				)
			)
		)
	);

	editModel$ = createEffect(() =>
		this.actions$.pipe(
			ofType(restActions.editModel),
			switchMap(({path, model}) =>
				this.modelApiService.editModel(path, model).pipe(
					mergeMap(() => [
						restActions.modelEdited({path, model}),
						restActions.updateModels({path}),
					]),
					catchError(() => {
						this.notificationsFacade.showNotification({
							label: 'Не удалось обновить модель',
							content: 'Попробуйте еще раз позже',
							status: TuiNotification.Error,
						});
						return of(restActions.dialogRequestFailure());
					})
				)
			)
		)
	);

	deleteModel$ = createEffect(() =>
		this.actions$.pipe(
			ofType(restActions.deleteModel),
			switchMap(({path, modelId}) =>
				this.modelApiService.deleteModel(path, modelId).pipe(
					map(() => restActions.modelDeleted({modelId})),
					catchError(() => {
						this.notificationsFacade.showNotification({
							label: 'Не удалось удалить модель',
							content: 'Попробуйте еще раз позже',
							status: TuiNotification.Error,
						});
						return EMPTY;
					})
				)
			)
		)
	);

	deleteAllModels$ = createEffect(() =>
		this.actions$.pipe(
			ofType(restActions.deleteAllModels),
			switchMap(({path}) =>
				this.modelApiService.deleteAllModels(path).pipe(
					map(() => restActions.allModelsDeleted()),
					tap(() => {
						this.notificationsFacade.showNotification({
							content: 'Все модели удалены',
							status: TuiNotification.Success,
						});
					}),
					catchError(() => {
						this.notificationsFacade.showNotification({
							label: 'Не удалось удалить модели',
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
		private readonly modelApiService: RestModelApiService,
		private readonly mockApiService: RestMockApiService,
		private readonly notificationsFacade: NotificationsFacade,
		private readonly router: Router
	) {}
}
