import {ChangeDetectionStrategy, Component} from '@angular/core';
import {
	RestHistoryFacade,
	RestHistoryItemDto,
	RestResponseSource,
} from '@mocker/rest/history/domain';
import {format} from 'date-fns';
import {tap} from 'rxjs';

function stringifyResponseSource(responseSource: RestResponseSource): string {
	switch (responseSource) {
		case RestResponseSource.MockTemplate:
			return 'Шаблон';
		case RestResponseSource.ProxiedResponse:
			return 'Реальный сервис';
		case RestResponseSource.StaticResponse:
			return 'Статический ответ';
	}
}

@Component({
	selector: 'mocker-rest-history-table',
	templateUrl: './rest-history-table.component.html',
	styleUrls: ['./rest-history-table.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RestHistoryTableComponent {
	readonly history$ = this.facade.history$.pipe(
		tap(() => {
			this.expandedRows = [];
		})
	);
	readonly page$ = this.facade.page$;
	readonly pageSize$ = this.facade.pageSize$;
	readonly totalItems$ = this.facade.totalItems$;
	readonly loading$ = this.facade.loading$;

	readonly columns = [
		'expand',
		'responseTime',
		'method',
		'statusCode',
		'queryUrl',
		'responseSource',
		'response',
	];

	readonly sizeOptions = [10, 20, 30, 50];

	expandedRows: number[] = [];

	readonly getSource = stringifyResponseSource;

	readonly formatDate = (date: string) =>
		format(new Date(date), 'dd.MM.yy HH:mm:ss');

	readonly getExpanded = (expandedRows: number[], id: number) =>
		expandedRows.includes(id);

	readonly getExpandedIcon = (expanded: boolean) =>
		expanded ? 'tuiIconMinusSquare' : 'tuiIconPlusSquare';

	constructor(private readonly facade: RestHistoryFacade) {}

	changePage(page: number) {
		this.facade.changePage(page);
	}

	changePageSize(pageSize: number) {
		this.facade.changePageSize(pageSize);
	}

	expandRow(id: number, expanded: boolean) {
		if (expanded) {
			this.expandedRows = this.expandedRows.filter(item => item !== id);
			return;
		}

		this.expandedRows = [id, ...this.expandedRows];
	}

	expandAllRows(history: ReadonlyArray<RestHistoryItemDto>) {
		if (this.expandedRows.length === history.length) {
			this.expandedRows = [];
			return;
		}

		this.expandedRows = history.map(({id}) => id);
	}
}
