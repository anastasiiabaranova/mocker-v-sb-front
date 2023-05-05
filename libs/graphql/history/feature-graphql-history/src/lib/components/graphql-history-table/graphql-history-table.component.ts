import {ChangeDetectionStrategy, Component} from '@angular/core';
import {
	GraphQLHistoryFacade,
	GraphQLHistoryItemDto,
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

	readonly columns = [
		'expand',
		'createdAt',
		'redirected',
		'request',
		'response',
		'isError',
	];

	expandedRows: number[] = [];

	readonly formatDate = (date: string) =>
		format(new Date(date), 'dd.MM.yy HH.mm');

	readonly getExpanded = (expandedRows: number[], id: number) =>
		expandedRows.includes(id);

	readonly getExpandedIcon = (expanded: boolean) =>
		expanded ? 'tuiIconMinusSquare' : 'tuiIconPlusSquare';

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
}
