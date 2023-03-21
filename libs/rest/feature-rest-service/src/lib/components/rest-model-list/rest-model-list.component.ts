import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Output,
} from '@angular/core';
import {RestModelShortDto} from '@mocker/rest/domain';

@Component({
	selector: 'mocker-rest-model-list',
	templateUrl: './rest-model-list.component.html',
	styleUrls: ['./rest-model-list.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RestModelListComponent implements OnChanges {
	@Input() models?: ReadonlyArray<RestModelShortDto> | null;

	@Output() readonly createModel = new EventEmitter<void>();
	@Output() readonly deleteModel = new EventEmitter<string>();
	@Output() readonly editModel = new EventEmitter<string>();

	readonly columns = ['name', 'actions'];
	readonly sizeOptions = [5, 10, 20];

	page = 0;
	size = 5;

	private _displayedModels: RestModelShortDto[] | null = null;

	get displayedModels() {
		if (!this._displayedModels) {
			this._displayedModels = (this.models || []).slice(
				this.page * this.size,
				this.page * this.size + this.size
			);
		}

		return this._displayedModels;
	}

	ngOnChanges(): void {
		this.updateDisplayedMocks();
	}

	updateDisplayedMocks() {
		this._displayedModels = (this.models || []).slice(
			this.page * this.size,
			this.page * this.size + this.size
		);
	}
}
