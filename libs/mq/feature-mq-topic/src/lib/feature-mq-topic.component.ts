import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MQFacade, Topic, TopicShort} from '@mocker/mq/domain';
import {Clipboard} from '@angular/cdk/clipboard';
import {TuiNotification} from '@taiga-ui/core';
import {NotificationsFacade} from '@mocker/shared/utils';

function msToTime(ms: number) {
	const seconds = ms / 1000;
	if (seconds < 60) {
		return seconds.toFixed(1) + ' сек';
	}

	const minutes = ms / (1000 * 60);
	if (minutes < 60) {
		return minutes.toFixed(1) + ' мин';
	}

	const hours = ms / (1000 * 60 * 60);
	if (hours < 24) {
		return hours.toFixed(1) + ' ч';
	}

	const days = ms / (1000 * 60 * 60 * 24);
	return days.toFixed(1) + ' дней';
}

@Component({
	selector: 'mocker-feature-mq-topic',
	templateUrl: './feature-mq-topic.component.html',
	styleUrls: ['./feature-mq-topic.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureMQTopicComponent {
	readonly topic$ = this.facade.currentTopic$;

	readonly getMessageRetention = (messageRetention?: number) =>
		messageRetention ? msToTime(messageRetention) : '7 дней';

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
