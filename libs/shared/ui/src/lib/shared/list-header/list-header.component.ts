import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Output,
} from '@angular/core';

@Component({
	selector: 'mocker-list-header',
	templateUrl: './list-header.component.html',
	styleUrls: ['./list-header.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListHeaderComponent {
	@Output() readonly create = new EventEmitter<void>();
	@Output() readonly searchChange = new EventEmitter<string | null>();
}
