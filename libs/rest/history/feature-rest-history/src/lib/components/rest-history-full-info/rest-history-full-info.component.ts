import {ChangeDetectionStrategy, Component, Inject, Input} from '@angular/core';
import {
	RestHeaderDto,
	RestHistoryItemDto,
	RestResponseSource,
} from '@mocker/rest/history/domain';
import {ENVIRONMENT, AppConfig} from '@mocker/shared/utils';
import {format} from 'date-fns';
import {BehaviorSubject} from 'rxjs';

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
	selector: 'mocker-rest-history-full-info',
	templateUrl: './rest-history-full-info.component.html',
	styleUrls: ['./rest-history-full-info.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RestHistoryFullInfoComponent {
	@Input() item!: RestHistoryItemDto;

	readonly showRequestHeaders$ = new BehaviorSubject<boolean>(false);
	readonly showResponseHeaders$ = new BehaviorSubject<boolean>(false);
	readonly showResponse$ = new BehaviorSubject<boolean>(false);

	readonly getSource = stringifyResponseSource;

	readonly formatDate = (date: number) =>
		format(new Date(date), 'dd.MM.yy HH:mm:ss');

	readonly stringifyHeaders = (headers: ReadonlyArray<RestHeaderDto>) =>
		headers.map(({name, value}) => `${name}=${value}`).join('\n');

	readonly getUrl = (url: string) => `${this.appConfig.gatewayUrl}${url}`;

	constructor(@Inject(ENVIRONMENT) private readonly appConfig: AppConfig) {}
}
