import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Output,
} from '@angular/core';
import {RestMockShortDto} from '@mocker/rest/domain';

@Component({
	selector: 'mocker-rest-mock-list',
	templateUrl: './rest-mock-list.component.html',
	styleUrls: ['./rest-mock-list.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RestMockListComponent implements OnChanges {
	@Input() mocks?: ReadonlyArray<RestMockShortDto> | null;

	@Output() readonly createMock = new EventEmitter<void>();
	@Output() readonly deleteMock = new EventEmitter<string>();

	readonly columns = ['method', 'name', 'path', 'actions'];
	readonly sizeOptions = [5, 10, 20];

	page = 0;
	size = 5;

	private _displayedMocks: RestMockShortDto[] | null = null;

	readonly getMethodClass = ({method}: RestMockShortDto) =>
		method.toLowerCase();

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
