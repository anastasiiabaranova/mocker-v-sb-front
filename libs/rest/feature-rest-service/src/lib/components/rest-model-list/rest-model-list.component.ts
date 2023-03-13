import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {RestModelShortDto} from '@mocker/rest/domain';

@Component({
	selector: 'mocker-rest-model-list',
	templateUrl: './rest-model-list.component.html',
	styleUrls: ['./rest-model-list.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RestModelListComponent {
	@Input() readonly models: ReadonlyArray<RestModelShortDto> = [
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

	readonly columns = ['name', 'actions'];
	readonly sizeOptions = [5, 10, 20];

	page = 0;
	size = 5;

	displayedModels = this.models.slice(0, this.size);

	onPaginationChange() {
		this.displayedModels = this.models.slice(
			this.page * this.size,
			this.page * this.size + this.size
		);
	}
}
