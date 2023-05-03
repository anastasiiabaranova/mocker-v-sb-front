import {
	ChangeDetectionStrategy,
	Component,
	Inject,
	Injector,
} from '@angular/core';
import {Clipboard} from '@angular/cdk/clipboard';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {
	GraphQLFacade,
	GraphQLMockDto,
	GraphQLServiceDto,
} from '@mocker/graphql/domain';
import {
	ENVIRONMENT,
	AppConfig,
	NotificationsFacade,
} from '@mocker/shared/utils';
import {CreateGraphQLServiceDialogComponent} from '@mocker/shared/ui';
import {TuiDialogService, TuiNotification} from '@taiga-ui/core';
import {format} from 'date-fns';
import {ru} from 'date-fns/locale';
import {CreateMockDialogComponent} from './components';

@Component({
	selector: 'mocker-feature-graphql-service',
	templateUrl: './feature-graphql-service.component.html',
	styleUrls: ['./feature-graphql-service.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureGraphQLServiceComponent {
	readonly service$ = this.facade.currentService$;

	readonly getDateTime = (expirationDate: string) =>
		format(new Date(expirationDate), 'dd MMMM yyyy, HH:mm', {locale: ru});

	readonly getServiceUrl = (name: string) =>
		`${this.appConfig.gatewayUrl}/mocker/${name}`;

	constructor(
		@Inject(ENVIRONMENT) private readonly appConfig: AppConfig,
		private readonly clipboard: Clipboard,
		private readonly facade: GraphQLFacade,
		private readonly notificationsFacade: NotificationsFacade,
		private readonly dialogService: TuiDialogService,
		private readonly injector: Injector
	) {}

	copyTextToClipboard(text: string) {
		if (this.clipboard.copy(text)) {
			this.notificationsFacade.showNotification({
				content: 'URL сервиса скопирован в буфер обмена',
				status: TuiNotification.Success,
			});
		}
	}

	editService(service: GraphQLServiceDto) {
		this.dialogService
			.open(
				new PolymorpheusComponent(
					CreateGraphQLServiceDialogComponent,
					this.injector
				),
				{data: service, size: 'l'}
			)
			.subscribe();
	}

	deleteService(id: string) {
		this.facade.deleteService(id);
	}

	createMock(serviceId: string) {
		this.dialogService
			.open(
				new PolymorpheusComponent(
					CreateMockDialogComponent,
					this.injector
				),
				{data: serviceId, size: 'l'}
			)
			.subscribe();
	}

	editMock(mock: GraphQLMockDto) {
		this.dialogService
			.open(
				new PolymorpheusComponent(
					CreateMockDialogComponent,
					this.injector
				),
				{data: mock, size: 'l'}
			)
			.subscribe();
	}

	deleteMock(mock: GraphQLMockDto) {
		this.facade.deleteMock(mock);
	}

	deleteAllMocks() {
		this.facade.deleteAllMocks();
	}
}
