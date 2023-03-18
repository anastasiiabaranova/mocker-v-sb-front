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
import {TuiDestroyService} from '@taiga-ui/cdk';
import {TuiDialogService} from '@taiga-ui/core';
import {
	AppConfig,
	ENVIRONMENT,
	NotificationsFacade,
} from '@mocker/shared/utils';
import {GraphQLMockDto} from '@mocker/graphql/domain';
import {format} from 'date-fns';
import {ru} from 'date-fns/locale';

@Component({
	selector: 'mocker-graphql-mock-list',
	templateUrl: './graphql-mock-list.component.html',
	styleUrls: ['./graphql-mock-list.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TuiDestroyService],
})
export class GraphQLMockListComponent implements OnChanges {
	@Input() mocks?: ReadonlyArray<GraphQLMockDto> | null;

	@Output() readonly createMock = new EventEmitter<void>();
	@Output() readonly deleteMock = new EventEmitter<GraphQLMockDto>();

	readonly columns = ['name', 'expirationDate', 'enable', 'actions'];
	readonly sizeOptions = [5, 10, 20];

	page = 0;
	size = 5;

	private _displayedMocks: GraphQLMockDto[] | null = null;

	readonly getDateTime = (expirationDate?: string) =>
		expirationDate
			? format(Date.parse(expirationDate), 'dd.MM.yyyy, HH:mm', {
					locale: ru,
			  })
			: '';

	readonly getEnabled = (enabled: boolean) => (enabled ? 'Вкл.' : 'Выкл.');

	constructor(
		@Inject(ENVIRONMENT) private readonly appConfig: AppConfig,
		private readonly dialogService: TuiDialogService,
		private readonly injector: Injector,
		private readonly clipboard: Clipboard,
		private readonly notificationsFacade: NotificationsFacade
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

	updateDisplayedMocks() {
		this._displayedMocks = (this.mocks || []).slice(
			this.page * this.size,
			this.page * this.size + this.size
		);
	}
}
