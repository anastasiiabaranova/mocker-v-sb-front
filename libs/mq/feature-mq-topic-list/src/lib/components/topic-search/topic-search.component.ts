import {ChangeDetectionStrategy, Component, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime} from 'rxjs';

@Component({
	selector: 'mocker-topic-search',
	templateUrl: './topic-search.component.html',
	styleUrls: ['./topic-search.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicSearchComponent {
	readonly search = new FormControl<string | null>(null);

	@Output() readonly searchChange = this.search.valueChanges.pipe(
		debounceTime(300)
	);
}
