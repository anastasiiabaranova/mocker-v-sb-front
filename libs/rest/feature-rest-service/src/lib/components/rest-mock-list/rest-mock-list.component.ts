import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Injector,
	Input,
	OnChanges,
	Output,
} from '@angular/core';
import {RestMockShortDto} from '@mocker/rest/domain';
import {TuiDestroyService} from '@taiga-ui/cdk';
import {TuiDialogService} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {ResponsesDialogComponent} from '../responses-dialog/responses-dialog.component';

@Component({
	selector: 'mocker-rest-mock-list',
	templateUrl: './rest-mock-list.component.html',
	styleUrls: ['./rest-mock-list.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TuiDestroyService],
})
export class RestMockListComponent implements OnChanges {
	@Input() mocks?: ReadonlyArray<RestMockShortDto> | null;
	@Input() path!: string;

	@Output() readonly createMock = new EventEmitter<void>();
	@Output() readonly deleteMock = new EventEmitter<string>();

	readonly columns = ['method', 'name', 'path', 'actions'];
	readonly sizeOptions = [5, 10, 20];

	page = 0;
	size = 5;

	private _displayedMocks: RestMockShortDto[] | null = null;

	readonly getMethodClass = ({method}: RestMockShortDto) =>
		method.toLowerCase();

	constructor(
		private readonly dialogService: TuiDialogService,
		private readonly injector: Injector
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

	showResponses(mockId: string) {
		this.dialogService
			.open(
				new PolymorpheusComponent(
					ResponsesDialogComponent,
					this.injector
				),
				{data: mockId, size: 'm'}
			)
			.subscribe();
	}
}
