import {
	ChangeDetectionStrategy,
	Component,
	Inject,
	Injector,
} from '@angular/core';
import {Clipboard} from '@angular/cdk/clipboard';
import {RestFacade, RestServiceDto} from '@mocker/rest/domain';
import {format} from 'date-fns';
import {ru} from 'date-fns/locale';
import {
	AppConfig,
	ENVIRONMENT,
	NotificationsFacade,
} from '@mocker/shared/utils';
import {TuiDialogService, TuiNotification} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {CreateRestServiceDialogComponent} from '@mocker/shared/ui';
import {
	CreateMockDialogComponent,
	CreateModelDialogComponent,
} from './components';

@Component({
	selector: 'mocker-feature-rest-service',
	templateUrl: './feature-rest-service.component.html',
	styleUrls: ['./feature-rest-service.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureRestServiceComponent {
	readonly service$ = this.facade.currentService$;
	readonly mocks$ = this.facade.mocks$;
	readonly models$ = this.facade.models$;

	readonly getDate = (expirationTime: number) =>
		format(new Date(expirationTime), 'dd MMMM yyyy, HH:mm', {locale: ru});

	readonly getServiceUrl = (path: string) =>
		`${this.appConfig.gatewayUrl}/rest/${path}`;

	constructor(
		@Inject(ENVIRONMENT) private readonly appConfig: AppConfig,
		private readonly clipboard: Clipboard,
		private readonly facade: RestFacade,
		private readonly dialogService: TuiDialogService,
		private readonly injector: Injector,
		private readonly notificationsFacade: NotificationsFacade
	) {}

	copyTextToClipboard(text: string) {
		if (this.clipboard.copy(text)) {
			this.notificationsFacade.showNotification({
				content: 'URL сервиса скопирован в буфер обмена',
				status: TuiNotification.Success,
			});
		}
	}

	editService(service: RestServiceDto) {
		this.dialogService
			.open(
				new PolymorpheusComponent(
					CreateRestServiceDialogComponent,
					this.injector
				),
				{data: service}
			)
			.subscribe();
	}

	deleteService(path: string) {
		this.facade.deleteService(path);
	}

	createMock(path: string) {
		this.dialogService
			.open(
				new PolymorpheusComponent(
					CreateMockDialogComponent,
					this.injector
				),
				{data: {path}, size: 'l'}
			)
			.subscribe();
	}

	editMock(path: string, mockId: string) {
		this.dialogService
			.open(
				new PolymorpheusComponent(
					CreateMockDialogComponent,
					this.injector
				),
				{data: {path, mockId}, size: 'l'}
			)
			.subscribe();
	}

	deleteMock(path: string, mockId: string) {
		this.facade.deleteMock(path, mockId);
	}

	deleteAllMocks(path: string) {
		this.facade.deleteAllMocks(path);
	}

	createModel(path: string) {
		this.dialogService
			.open(
				new PolymorpheusComponent(
					CreateModelDialogComponent,
					this.injector
				),
				{data: {path}}
			)
			.subscribe();
	}

	editModel(path: string, modelId: string) {
		this.dialogService
			.open(
				new PolymorpheusComponent(
					CreateModelDialogComponent,
					this.injector
				),
				{data: {path, modelId}}
			)
			.subscribe();
	}

	deleteModel(path: string, modelId: string) {
		this.facade.deleteModel(path, modelId);
	}

	deleteAllModels(path: string) {
		this.facade.deleteAllModels(path);
	}
}
