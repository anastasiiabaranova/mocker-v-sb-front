import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
	selector: 'mocker-feature-rest',
	templateUrl: './feature-rest.component.html',
	styleUrls: ['./feature-rest.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureRestComponent {
	showServicePlug = true;

	toggleServicePlug(show: boolean) {
		this.showServicePlug = show;
	}
}
