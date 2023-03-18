import {ChangeDetectionStrategy, Component, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime} from 'rxjs';

@Component({
	selector: 'mocker-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
	readonly search = new FormControl<string | null>(null);

	@Output() readonly searchChange = this.search.valueChanges.pipe(
		debounceTime(300)
	);
}
