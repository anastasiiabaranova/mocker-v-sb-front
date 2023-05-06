import {ChangeDetectionStrategy, Component} from '@angular/core';
import {
	GraphQLHistoryFacade,
	GraphQLHistoryItemDto,
	SortingOrder,
} from '@mocker/graphql/history/domain';
import {format} from 'date-fns';
import {tap} from 'rxjs';

@Component({
	selector: 'mocker-graphql-history-table',
	templateUrl: './graphql-history-table.component.html',
	styleUrls: ['./graphql-history-table.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphQLHistoryTableComponent {
	readonly history$ = this.facade.history$.pipe(
		tap(() => {
			this.expandedRows = [];
		})
	);
	readonly page$ = this.facade.page$;
	readonly pageSize$ = this.facade.pageSize$;
	readonly totalItems$ = this.facade.totalItems$;
	readonly loading$ = this.facade.loading$;
	readonly sortingOrder$ = this.facade.sortingOrder$;

	readonly columns = [
		'expand',
		'createdAt',
		'redirected',
		'request',
		'response',
		'isError',
	];

	expandedRows: number[] = [];

	readonly sizeOptions = [10, 20, 30, 50];

	readonly formatDate = (date: string) =>
		format(new Date(date), 'dd.MM.yy HH:mm:ss');

	readonly getExpanded = (expandedRows: number[], id: number) =>
		expandedRows.includes(id);

	readonly getExpandedIcon = (expanded: boolean) =>
		expanded ? 'tuiIconMinusSquare' : 'tuiIconPlusSquare';

	readonly getSortingOrder = (sortingOrder?: SortingOrder | null) =>
		sortingOrder === SortingOrder.Asc ? 1 : -1;

	constructor(private readonly facade: GraphQLHistoryFacade) {}

	expandRow(id: number, expanded: boolean) {
		if (expanded) {
			this.expandedRows = this.expandedRows.filter(item => item !== id);
			return;
		}

		this.expandedRows = [id, ...this.expandedRows];
	}

	expandAllRows(history: ReadonlyArray<GraphQLHistoryItemDto>) {
		if (this.expandedRows.length === history.length) {
			this.expandedRows = [];
			return;
		}

		this.expandedRows = history.map(({id}) => id);
	}

	changePage(page: number) {
		this.facade.changePage(page);
	}

	changePageSize(pageSize: number) {
		this.facade.changePageSize(pageSize);
	}

	changeSortingOrder(currentDirestion?: SortingOrder | null) {
		const sortingOrder =
			currentDirestion === SortingOrder.Asc
				? SortingOrder.Desc
				: SortingOrder.Asc;

		this.facade.changeSortingOrder(sortingOrder);
	}
}
