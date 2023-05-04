import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
	selector: 'mocker-feature-graphql-history',
	templateUrl: './feature-graphql-history.component.html',
	styleUrls: ['./feature-graphql-history.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureGraphQLHistoryComponent {}
