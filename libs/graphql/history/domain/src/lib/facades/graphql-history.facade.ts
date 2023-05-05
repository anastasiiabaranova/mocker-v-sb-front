import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {tuiIsPresent} from '@taiga-ui/cdk';
import {map} from 'rxjs';
import {fromGraphQLHistory, graphQLHistoryActions} from '../store';

@Injectable()
export class GraphQLHistoryFacade {
	readonly serviceId$ = this.store$.select(fromGraphQLHistory.getServiceId);

	readonly history$ = this.store$.select(fromGraphQLHistory.getHistory);

	readonly page$ = this.store$
		.select(fromGraphQLHistory.getPaging)
		.pipe(map(paging => (tuiIsPresent(paging) ? paging.page : null)));

	readonly pageSize$ = this.store$
		.select(fromGraphQLHistory.getPaging)
		.pipe(map(paging => (tuiIsPresent(paging) ? paging.pageSize : null)));

	readonly totalItems$ = this.store$
		.select(fromGraphQLHistory.getPaging)
		.pipe(map(paging => (tuiIsPresent(paging) ? paging.totalItems : null)));

	constructor(private readonly store$: Store) {}

	searchByDate(from?: string, to?: string) {
		this.store$.dispatch(graphQLHistoryActions.changeTimeRange({from, to}));
	}

	changePage(page: number) {
		this.store$.dispatch(graphQLHistoryActions.changePage({page}));
	}

	changePageSize(pageSize: number) {
		this.store$.dispatch(graphQLHistoryActions.changePageSize({pageSize}));
	}
}
