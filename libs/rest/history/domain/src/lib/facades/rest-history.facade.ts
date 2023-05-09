import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {RestHistoryParamsDto} from '../dtos';
import {RestSortingOrder} from '../enums';
import {fromRestHistory, restHistoryActions} from '../store';

@Injectable()
export class RestHistoryFacade {
	readonly serviceId$ = this.store$.select(fromRestHistory.getServiceId);

	readonly servicePath$ = this.store$.select(fromRestHistory.getServicePath);

	readonly history$ = this.store$.select(fromRestHistory.getHistory);

	readonly page$ = this.store$.select(fromRestHistory.getPage);

	readonly pageSize$ = this.store$.select(fromRestHistory.getPageSize);

	readonly totalItems$ = this.store$.select(fromRestHistory.getTotalItems);

	readonly sortingOrder$ = this.store$.select(
		fromRestHistory.getSortingOrder
	);

	readonly loading$ = this.store$.select(fromRestHistory.getLoading);

	constructor(private readonly store$: Store) {}

	searchHistory(params: RestHistoryParamsDto) {
		this.store$.dispatch(restHistoryActions.searchHistory({params}));
	}

	changePage(page: number) {
		this.store$.dispatch(restHistoryActions.changePage({page}));
	}

	changePageSize(pageSize: number) {
		this.store$.dispatch(restHistoryActions.changePageSize({pageSize}));
	}

	changeSortingOrder(sortingOrder: RestSortingOrder) {
		this.store$.dispatch(
			restHistoryActions.changeSortingOrder({sortingOrder})
		);
	}
}
