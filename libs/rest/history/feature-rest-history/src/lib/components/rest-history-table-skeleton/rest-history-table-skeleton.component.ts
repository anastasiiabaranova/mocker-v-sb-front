import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
	selector: 'mocker-rest-history-table-skeleton',
	templateUrl: './rest-history-table-skeleton.component.html',
	styleUrls: ['./rest-history-table-skeleton.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RestHistoryTableSkeletonComponent {
	readonly skeletons = Array(15);
}
