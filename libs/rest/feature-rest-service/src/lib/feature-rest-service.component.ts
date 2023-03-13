import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Clipboard} from '@angular/cdk/clipboard';
import {Observable} from 'rxjs';
import {map, mapTo} from 'rxjs/operators';
import {RestServiceDto} from '@mocker/rest/domain';
import {format} from 'date-fns';
import {ru} from 'date-fns/locale';
import {AppConfig, ENVIRONMENT} from '@mocker/shared/utils';

@Component({
	selector: 'mocker-feature-rest-service',
	templateUrl: './feature-rest-service.component.html',
	styleUrls: ['./feature-rest-service.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureRestServiceComponent {
	readonly service$: Observable<RestServiceDto> = this.route.params.pipe(
		map(({id}) => id),
		mapTo({
			name: 'Супер сервис 1',
			path: 'super-service',
			// mocks?: ReadonlyArray<RestMockShortDto>;
			// models?: ReadonlyArray<RestModelShortDto>;
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
			url: 'super-service.com',
			expirationTime: 1691844886000,
		})
	);

	readonly getDate = (expirationTime: number) =>
		format(new Date(expirationTime), 'dd MMMM yyyy, HH:mm', {locale: ru});

	readonly getServiceUrl = (path: string) =>
		`${this.appConfig.serverUrl}/${path}`;

	constructor(
		@Inject(ENVIRONMENT) private readonly appConfig: AppConfig,
		private readonly clipboard: Clipboard,
		private readonly route: ActivatedRoute
	) {}

	copyTextToClipboard(text: string) {
		this.clipboard.copy(text);
	}
}
