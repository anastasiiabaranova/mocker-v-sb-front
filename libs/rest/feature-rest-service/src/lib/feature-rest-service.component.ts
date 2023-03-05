import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
	selector: 'mocker-feature-rest-service',
	templateUrl: './feature-rest-service.component.html',
	styleUrls: ['./feature-rest-service.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureRestServiceComponent {}
