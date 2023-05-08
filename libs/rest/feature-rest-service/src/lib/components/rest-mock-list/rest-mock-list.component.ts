import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Inject,
	Injector,
	Input,
	OnChanges,
	Output,
} from '@angular/core';
import {Clipboard} from '@angular/cdk/clipboard';
import {RestMockShortDto} from '@mocker/rest/domain';
import {TuiDestroyService} from '@taiga-ui/cdk';
import {TuiDialogService, TuiNotification} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {ResponsesDialogComponent} from '../responses-dialog/responses-dialog.component';
import {
	AppConfig,
	ENVIRONMENT,
	NotificationsFacade,
} from '@mocker/shared/utils';
import {takeUntil} from 'rxjs';

@Component({
	selector: 'mocker-rest-mock-list',
	templateUrl: './rest-mock-list.component.html',
	styleUrls: ['./rest-mock-list.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TuiDestroyService],
})
export class RestMockListComponent implements OnChanges {
	@Input() mocks?: ReadonlyArray<RestMockShortDto> | null;
	@Input() servicePath!: string;

	@Output() readonly createMock = new EventEmitter<void>();
	@Output() readonly deleteMock = new EventEmitter<string>();
	@Output() readonly editMock = new EventEmitter<string>();
	@Output() readonly deleteAll = new EventEmitter<void>();

	readonly columns = ['method', 'name', 'path', 'actions'];
	readonly sizeOptions = [5, 10, 20];

	page = 0;
	size = 5;

	private _displayedMocks: RestMockShortDto[] | null = null;

	readonly getMethodClass = ({method}: RestMockShortDto) =>
		method.toLowerCase();

	constructor(
		@Inject(ENVIRONMENT) private readonly appConfig: AppConfig,
		private readonly dialogService: TuiDialogService,
		private readonly injector: Injector,
		private readonly clipboard: Clipboard,
		private readonly notificationsFacade: NotificationsFacade,
		private readonly destroy$: TuiDestroyService
	) {}

	get displayedMocks() {
		if (!this._displayedMocks) {
			this._displayedMocks = (this.mocks || []).slice(
				this.page * this.size,
				this.page * this.size + this.size
			);
		}

		return this._displayedMocks;
	}

	ngOnChanges(): void {
		this.updateDisplayedMocks();
	}

	copyMockUrlToClipboard(mockPath: string) {
		const url = `${this.appConfig.gatewayUrl}/rest/${this.servicePath}/${mockPath}`;

		if (this.clipboard.copy(url)) {
			this.notificationsFacade.showNotification({
				content: 'URL шаблона мока скопирован в буфер обмена',
				status: TuiNotification.Success,
			});
		}
	}

	updateDisplayedMocks() {
		this._displayedMocks = (this.mocks || []).slice(
			this.page * this.size,
			this.page * this.size + this.size
		);
	}

	showResponses(mockId: string) {
		this.dialogService
			.open(
				new PolymorpheusComponent(
					ResponsesDialogComponent,
					this.injector
				),
				{data: mockId, size: 'm'}
			)
			.pipe(takeUntil(this.destroy$))
			.subscribe();
	}
}
