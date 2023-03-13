import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {RestMockShortDto} from '@mocker/rest/domain';

@Component({
	selector: 'mocker-rest-mock-list',
	templateUrl: './rest-mock-list.component.html',
	styleUrls: ['./rest-mock-list.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RestMockListComponent {
	@Input() readonly mocks: ReadonlyArray<RestMockShortDto> = [
		// {
		// 	mockId: '0',
		// 	name: 'Мой клевый мок',
		// 	description:
		// 		'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
		// 	path: '/my-cool-mock',
		// 	method: 'GET',
		// },
		// {
		// 	mockId: '1',
		// 	name: 'Какой-то мок',
		// 	description:
		// 		'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
		// 	path: '/some-mock',
		// 	method: 'GET',
		// },
		// {
		// 	mockId: '2',
		// 	name: 'Еще один мок',
		// 	description:
		// 		'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
		// 	path: '/another-mock',
		// 	method: 'POST',
		// },
		// ...Array(10)
		// 	.fill(null)
		// 	.map(() => ({
		// 		mockId: '2',
		// 		name: 'Еще один мок',
		// 		description:
		// 			'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
		// 		path: '/another-mock',
		// 		method: 'POST',
		// 	})),
	];

	readonly columns = ['name', 'method', 'path', 'actions'];
	readonly sizeOptions = [5, 10, 20];

	page = 0;
	size = 5;

	displayedMocks = this.mocks.slice(0, this.size);

	onPaginationChange() {
		this.displayedMocks = this.mocks.slice(
			this.page * this.size,
			this.page * this.size + this.size
		);
	}
}
