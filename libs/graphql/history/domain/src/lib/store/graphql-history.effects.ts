import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
	map,
	catchError,
	switchMap,
	withLatestFrom,
	filter,
	startWith,
	mergeMap,
} from 'rxjs/operators';
import {combineLatest, EMPTY} from 'rxjs';
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

@Injectable()
export class GraphQLHistoryEffects {
	loadHistory$ = createEffect(() =>
		combineLatest([
			this.actions$.pipe(ofType(ROUTER_NAVIGATED)),
			this.actions$.pipe(
				ofType(graphQLHistoryActions.changePage),
				map(({page}) => page),
				startWith(0)
			),
			this.actions$.pipe(
				ofType(graphQLHistoryActions.changePageSize),
				map(({pageSize}) => pageSize),
				startWith(10)
			),
			this.actions$.pipe(
				ofType(graphQLHistoryActions.changeTimeRange),
				startWith({} as any)
			),
		]).pipe(
			map(([, page, pageSize, {from, to}]) => ({
				page,
				pageSize,
				from,
				to,
			})),
			map(removeEmptyFields),
			withLatestFrom(
				this.store$
					.select(fromGraphQLHistory.getServiceId)
					.pipe(filter(tuiIsPresent))
			),
			switchMap(([params, serviceId]) =>
				this.apiService.getHistory(serviceId, params)
			),
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
				return EMPTY;
			})
		)
	);

	constructor(
		private readonly actions$: Actions,
		private readonly store$: Store,
		private readonly apiService: GraphQLHistoryApiService,
		private readonly notificationsFacade: NotificationsFacade
	) {}
}
