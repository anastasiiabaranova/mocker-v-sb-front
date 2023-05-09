import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
	map,
	catchError,
	switchMap,
	withLatestFrom,
	filter,
	mergeMap,
	debounceTime,
} from 'rxjs/operators';
import {combineLatest, of} from 'rxjs';
import {NotificationsFacade} from '@mocker/shared/utils';
import {TuiNotification} from '@taiga-ui/core';
import {tuiIsPresent} from '@taiga-ui/cdk';
import {Store} from '@ngrx/store';
import {ROUTER_NAVIGATED} from '@ngrx/router-store';

import {fromRestHistory} from './rest-history.selectors';
import {RestHistoryParamsDto} from '../dtos';
import {restHistoryActions} from './rest-history.actions';
import {RestHistoryApiService} from '../services';

function removeEmptyFields(params: RestHistoryParamsDto): RestHistoryParamsDto {
	return Object.fromEntries(
		Object.entries(params).filter(([, value]) => tuiIsPresent(value))
	);
}

function toParams([
	,
	page,
	pageSize,
	from,
	to,
	search,
	statusCodes,
	responseSources,
	requestMethods,
	timeSort,
]: any[]): RestHistoryParamsDto {
	return {
		page,
		pageSize,
		from,
		to,
		search,
		statusCodes,
		responseSources,
		requestMethods,
		timeSort,
	};
}

@Injectable()
export class RestHistoryEffects {
	private readonly navigatedToHistory$ = this.actions$.pipe(
		ofType(ROUTER_NAVIGATED),
		map(({payload: {routerState}}) => routerState as any),
		map(({url}) => url),
		filter(url => url.startsWith('/rest-api-history'))
	);

	resetState$ = createEffect(() =>
		this.navigatedToHistory$.pipe(
			map(() => restHistoryActions.resetState())
		)
	);

	loadHistory$ = createEffect(() =>
		combineLatest([
			this.navigatedToHistory$,
			this.store$.select(fromRestHistory.getPage),
			this.store$.select(fromRestHistory.getPageSize),
			this.store$.select(fromRestHistory.getFrom),
			this.store$.select(fromRestHistory.getTo),
			this.store$.select(fromRestHistory.getSearch),
			this.store$.select(fromRestHistory.getStatusCodes),
			this.store$.select(fromRestHistory.getResponseSources),
			this.store$.select(fromRestHistory.getRequestMethods),
			this.store$.select(fromRestHistory.getSortingOrder),
		]).pipe(
			debounceTime(0),
			map(toParams),
			map(removeEmptyFields),
			withLatestFrom(
				this.store$
					.select(fromRestHistory.getServiceId)
					.pipe(filter(tuiIsPresent))
			),
			switchMap(([params, serviceId]) =>
				this.apiService.getHistory(serviceId, params).pipe(
					mergeMap(({paging, items}) => [
						restHistoryActions.setPaging({paging}),
						restHistoryActions.setHistory({items}),
					]),
					catchError(() => {
						this.notificationsFacade.showNotification({
							label: 'Не удалось загрузить историю',
							content: 'Попробуйте еще раз позже',
							status: TuiNotification.Error,
						});
						return of(restHistoryActions.historyLoadFailure());
					})
				)
			)
		)
	);

	constructor(
		private readonly actions$: Actions,
		private readonly store$: Store,
		private readonly apiService: RestHistoryApiService,
		private readonly notificationsFacade: NotificationsFacade
	) {}
}
