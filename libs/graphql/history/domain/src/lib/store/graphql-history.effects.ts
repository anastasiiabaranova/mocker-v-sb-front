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

import {GraphQLHistoryApiService} from '../services';
import {graphQLHistoryActions} from './graphql-history.actions';
import {fromGraphQLHistory} from './graphql-history.selectors';
import {GraphQLHistoryParamsDto} from '../dtos';

function removeEmptyFields(
	params: GraphQLHistoryParamsDto
): GraphQLHistoryParamsDto {
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
	redirected,
	isError,
	sortingOrder,
]: any[]): GraphQLHistoryParamsDto {
	return {
		page,
		pageSize,
		from,
		to,
		redirected,
		isError,
		sortingOrder,
	};
}

@Injectable()
export class GraphQLHistoryEffects {
	private readonly navigatedToHistory$ = this.actions$.pipe(
		ofType(ROUTER_NAVIGATED),
		map(({payload: {routerState}}) => routerState as any),
		map(({url}) => url),
		filter(url => url.startsWith('/graphql-history'))
	);

	resetState$ = createEffect(() =>
		this.navigatedToHistory$.pipe(
			map(() => graphQLHistoryActions.resetState())
		)
	);

	loadHistory$ = createEffect(() =>
		combineLatest([
			this.navigatedToHistory$,
			this.store$.select(fromGraphQLHistory.getPage),
			this.store$.select(fromGraphQLHistory.getPageSize),
			this.store$.select(fromGraphQLHistory.getFrom),
			this.store$.select(fromGraphQLHistory.getTo),
			this.store$.select(fromGraphQLHistory.getRedirected),
			this.store$.select(fromGraphQLHistory.getIsError),
			this.store$.select(fromGraphQLHistory.getSortingOrder),
		]).pipe(
			debounceTime(0),
			map(toParams),
			map(removeEmptyFields),
			withLatestFrom(
				this.store$
					.select(fromGraphQLHistory.getServiceId)
					.pipe(filter(tuiIsPresent))
			),
			switchMap(([params, serviceId]) =>
				this.apiService.getHistory(serviceId, params).pipe(
					mergeMap(({paging, items}) => [
						graphQLHistoryActions.setPaging({paging}),
						graphQLHistoryActions.setHistory({items}),
					]),
					catchError(() => {
						this.notificationsFacade.showNotification({
							label: 'Не удалось загрузить историю',
							content: 'Попробуйте еще раз позже',
							status: TuiNotification.Error,
						});
						return of(graphQLHistoryActions.historyLoadFailure());
					})
				)
			)
		)
	);

	constructor(
		private readonly actions$: Actions,
		private readonly store$: Store,
		private readonly apiService: GraphQLHistoryApiService,
		private readonly notificationsFacade: NotificationsFacade
	) {}
}
