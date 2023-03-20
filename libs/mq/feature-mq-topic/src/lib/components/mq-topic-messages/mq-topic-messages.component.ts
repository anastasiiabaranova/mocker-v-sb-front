import {
	ChangeDetectionStrategy,
	Component,
	Injector,
	Input,
} from '@angular/core';
import {MQFacade, Topic} from '@mocker/mq/domain';
import {TuiDialogService} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {Subject, switchMap, tap} from 'rxjs';
import {MessageSendDialogComponent} from '../message-send-dialog/message-send-dialog.component';

@Component({
	selector: 'mocker-mq-topic-messages',
	templateUrl: './mq-topic-messages.component.html',
	styleUrls: ['./mq-topic-messages.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MQTopicMessagesComponent {
	@Input() topic!: Topic;

	readonly read$ = new Subject<void>();

	readonly messages$ = this.read$.pipe(
		tap(() => (this.messagesLoading = true)),
		switchMap(() =>
			this.facade.readMessages(
				this.topic.brokerType,
				this.topic.topicName
			)
		),
		tap(() => (this.messagesLoading = false))
	);

	readonly columns = ['key', 'value'];

	messagesLoading = false;

	constructor(
		private readonly facade: MQFacade,
		private readonly dialogService: TuiDialogService,
		private readonly injector: Injector
	) {}

	sendMessages() {
		this.dialogService
			.open(
				new PolymorpheusComponent(
					MessageSendDialogComponent,
					this.injector
				),
				{data: this.topic, size: 's'}
			)
			.subscribe();
	}

	readMessages() {
		this.read$.next();
	}
}
