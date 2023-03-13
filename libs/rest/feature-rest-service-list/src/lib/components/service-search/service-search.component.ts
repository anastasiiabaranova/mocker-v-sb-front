import {ChangeDetectionStrategy, Component, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
	selector: 'mocker-service-search',
	templateUrl: './service-search.component.html',
	styleUrls: ['./service-search.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceSearchComponent {
	readonly search = new FormControl(null);

	@Output() readonly searchChange = this.search.valueChanges;
}
