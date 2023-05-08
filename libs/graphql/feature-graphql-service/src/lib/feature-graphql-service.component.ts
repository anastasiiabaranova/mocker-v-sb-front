import {
	ChangeDetectionStrategy,
	Component,
	Inject,
	Injector,
	OnInit,
} from '@angular/core';
import {Clipboard} from '@angular/cdk/clipboard';
import {FormBuilder} from '@angular/forms';
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
import {filter, map, shareReplay, takeUntil, tap, withLatestFrom} from 'rxjs';
import {TuiDestroyService, tuiIsPresent} from '@taiga-ui/cdk';

@Component({
	selector: 'mocker-feature-graphql-service',
	templateUrl: './feature-graphql-service.component.html',
	styleUrls: ['./feature-graphql-service.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TuiDestroyService],
})
export class FeatureGraphQLServiceComponent implements OnInit {
	readonly service$ = this.facade.currentService$.pipe(
		filter(tuiIsPresent),
		tap(({storeHistory}) => {
			this.form.patchValue({storeHistory}, {emitEvent: false});
		}),
		shareReplay(1)
	);

	readonly form = this.formBuilder.group({
		storeHistory: [false],
	});

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
		private readonly formBuilder: FormBuilder,
		private readonly injector: Injector,
		private readonly destroy$: TuiDestroyService
	) {}

	ngOnInit(): void {
		this.form.controls.storeHistory.valueChanges
			.pipe(
				filter(tuiIsPresent),
				withLatestFrom(this.service$.pipe(map(({id}) => id))),
				tap(([enable, id]) => this.facade.switchHistory(id!, enable)),
				takeUntil(this.destroy$)
			)
			.subscribe();
	}

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
			.pipe(takeUntil(this.destroy$))
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
			.pipe(takeUntil(this.destroy$))
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
			.pipe(takeUntil(this.destroy$))
			.subscribe();
	}

	deleteMock(mock: GraphQLMockDto) {
		this.facade.deleteMock(mock);
	}

	deleteAllMocks() {
		this.facade.deleteAllMocks();
	}
}
