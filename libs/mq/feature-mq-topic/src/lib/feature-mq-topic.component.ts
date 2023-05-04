import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MQFacade, Topic, TopicShort} from '@mocker/mq/domain';
import {Clipboard} from '@angular/cdk/clipboard';
import {TuiNotification} from '@taiga-ui/core';
import {NotificationsFacade} from '@mocker/shared/utils';

@Component({
	selector: 'mocker-feature-mq-topic',
	templateUrl: './feature-mq-topic.component.html',
	styleUrls: ['./feature-mq-topic.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureMQTopicComponent {
	readonly topic$ = this.facade.currentTopic$;

	readonly getAddress = (topic: Topic) => `${topic.host}:${topic.port}`;

	constructor(
		private readonly facade: MQFacade,
		private readonly clipboard: Clipboard,
		private readonly notificationsFacade: NotificationsFacade
	) {}

	copyTextToClipboard(text: string) {
		if (this.clipboard.copy(text)) {
			this.notificationsFacade.showNotification({
				content: 'Адрес скопирован в буфер обмена',
				status: TuiNotification.Success,
			});
		}
	}

	deleteTopic(topic: TopicShort) {
		this.facade.deleteTopic(topic.brokerType, topic.topicName);
	}
}
