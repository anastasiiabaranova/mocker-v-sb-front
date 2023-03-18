import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
	selector: 'mocker-feature-mq',
	templateUrl: './feature-mq.component.html',
	styleUrls: ['./feature-mq.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureMQComponent {
	showTopicPlug = true;

	toggleTopicPlug(show: boolean) {
		this.showTopicPlug = show;
	}
}
