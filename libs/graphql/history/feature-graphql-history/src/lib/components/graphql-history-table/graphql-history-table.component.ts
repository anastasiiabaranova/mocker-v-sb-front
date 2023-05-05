import {ChangeDetectionStrategy, Component} from '@angular/core';
import {GraphQLHistoryFacade} from '@mocker/graphql/history/domain';
import {format} from 'date-fns';

@Component({
	selector: 'mocker-graphql-history-table',
	templateUrl: './graphql-history-table.component.html',
	styleUrls: ['./graphql-history-table.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphQLHistoryTableComponent {
	readonly history$ = this.facade.history$;
	readonly page$ = this.facade.page$;
	readonly pageSize$ = this.facade.pageSize$;
	readonly totalItems$ = this.facade.totalItems$;

	readonly columns = [
		'createdAt',
		'redirected',
		'request',
		'response',
		'isError',
	];

	readonly formatDate = (date: string) =>
		format(new Date(date), 'dd.MM.yy HH.mm');

	constructor(private readonly facade: GraphQLHistoryFacade) {}
}
