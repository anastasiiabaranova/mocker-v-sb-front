import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';
import {RestModelShortDto} from '@mocker/rest/domain';

@Component({
	selector: 'mocker-rest-model-list',
	templateUrl: './rest-model-list.component.html',
	styleUrls: ['./rest-model-list.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RestModelListComponent {
	@Input() models?: ReadonlyArray<RestModelShortDto> | null = [
		// {
		// 	modelId: '0',
		// 	name: 'Моя клевая моделька',
		// 	description:
		// 		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
		// },
		// {
		// 	modelId: '1',
		// 	name: 'Какая-то моделька',
		// 	description:
		// 		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
		// },
		// {
		// 	modelId: '2',
		// 	name: 'Еще одна моделька',
		// 	description:
		// 		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
		// },
		// ...Array(10)
		// 	.fill(null)
		// 	.map(() => ({
		// 		modelId: '2',
		// 		name: 'Моя моделька',
		// 		description:
		// 			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
		// 	})),
	];

	@Output() readonly createModel = new EventEmitter<void>();
	@Output() readonly deleteModel = new EventEmitter<string>();

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

	onPaginationChange() {
		this._displayedModels = (this.models || []).slice(
			this.page * this.size,
			this.page * this.size + this.size
		);
	}
}
