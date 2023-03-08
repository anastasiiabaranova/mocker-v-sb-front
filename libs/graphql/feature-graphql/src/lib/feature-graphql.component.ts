import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
	selector: 'mocker-feature-graphql',
	templateUrl: './feature-graphql.component.html',
	styleUrls: ['./feature-graphql.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureGraphQLComponent {}
