import {
	ChangeDetectionStrategy,
	Component,
	Injector,
	Input,
	OnChanges,
} from '@angular/core';
import {Clipboard} from '@angular/cdk/clipboard';
import {Message, MQFacade, Topic} from '@mocker/mq/domain';
import {NotificationsFacade} from '@mocker/shared/utils';
import {TuiDialogService, TuiNotification} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {iif, of, Subject, switchMap, tap} from 'rxjs';
import {MessageSendDialogComponent} from '../message-send-dialog/message-send-dialog.component';

@Component({
	selector: 'mocker-mq-topic-messages',
	templateUrl: './mq-topic-messages.component.html',
	styleUrls: ['./mq-topic-messages.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MQTopicMessagesComponent implements OnChanges {
	@Input() topic!: Topic;

	readonly read$ = new Subject<boolean>();

	readonly messages$ = this.read$.pipe(
		tap(() => (this.messagesLoading = true)),
		switchMap(read =>
			iif(
				() => read,
				this.facade.readMessages(
					this.topic.brokerType,
					this.topic.topicName
				),
				of(null)
			)
		),
		tap(messages => {
			this.updateDisplayedMessages(messages);
			this.messagesLoading = false;
		})
	);

	readonly columns = ['key', 'content', 'actions'];

	readonly sizeOptions = [5, 10, 15];

	messagesLoading = false;

	page = 0;
	size = 5;

	private _displayedMessages: Message[] | null = null;

	constructor(
		private readonly facade: MQFacade,
		private readonly dialogService: TuiDialogService,
		private readonly clipboard: Clipboard,
		private readonly notificationsFacade: NotificationsFacade,
		private readonly injector: Injector
	) {}

	get displayedMessages(): Message[] {
		return this._displayedMessages || [];
	}

	ngOnChanges(): void {
		this.read$.next(false);
	}

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
		this.read$.next(true);
	}

	updateDisplayedMessages(messages: ReadonlyArray<Message> | null) {
		if (!messages) {
			this._displayedMessages = null;
		}

		this._displayedMessages = (messages || []).slice(
			this.page * this.size,
			this.page * this.size + this.size
		);
	}

	copyMessageToClipboard(content: string) {
		if (this.clipboard.copy(content)) {
			this.notificationsFacade.showNotification({
				content: 'Сообщение скопировано в буфер обмена',
				status: TuiNotification.Success,
			});
		}
	}
}
