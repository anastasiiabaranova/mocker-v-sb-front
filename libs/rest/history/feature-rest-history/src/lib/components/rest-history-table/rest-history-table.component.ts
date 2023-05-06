import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RestHistoryFacade} from '@mocker/rest/history/domain';
import {format} from 'date-fns';

@Component({
	selector: 'mocker-rest-history-table',
	templateUrl: './rest-history-table.component.html',
	styleUrls: ['./rest-history-table.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RestHistoryTableComponent {
	readonly history$ = this.facade.history$;
	readonly loading$ = this.facade.loading$;

	readonly columns = [
		'responseTime',
		'method',
		'statusCode',
		'queryUrl',
		'responseUrl',
		'responseSource',
		'response',
	];

	readonly formatDate = (date: string) =>
		format(new Date(date), 'dd.MM.yy HH:mm:ss');

	constructor(private readonly facade: RestHistoryFacade) {}
}
