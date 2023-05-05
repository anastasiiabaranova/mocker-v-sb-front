import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
	selector: 'mocker-graphql-history-table-skeleton',
	templateUrl: './graphql-history-table-skeleton.component.html',
	styleUrls: ['./graphql-history-table-skeleton.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphQLHistoryTableSkeletonComponent {
	readonly skeletons = Array(15);
}
