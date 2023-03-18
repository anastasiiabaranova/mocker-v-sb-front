import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {TopicShort} from '@mocker/mq/domain';

@Component({
	selector: 'mocker-topic-card',
	templateUrl: './topic-card.component.html',
	styleUrls: ['./topic-card.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicCardComponent {
	@Input() topic!: TopicShort;
}
