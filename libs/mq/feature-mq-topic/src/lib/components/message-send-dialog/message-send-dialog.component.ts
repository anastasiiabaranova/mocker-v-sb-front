import {
	ChangeDetectionStrategy,
	Component,
	Inject,
	OnInit,
} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MQFacade, TopicShort} from '@mocker/mq/domain';
import {requiredValidatorFactory} from '@mocker/shared/utils';
import {
	TuiDestroyService,
	tuiMarkControlAsTouchedAndValidate,
	tuiPure,
} from '@taiga-ui/cdk';
import {TuiDialogContext} from '@taiga-ui/core';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import {takeUntil} from 'rxjs';

const KEY_REQUIRED_ERROR = 'Укажите ключ';
const CONTENT_REQUIRED_ERROR = 'Укажите содержание сообщения';

@Component({
	selector: 'mocker-message-send-dialog',
	templateUrl: './message-send-dialog.component.html',
	styleUrls: ['./message-send-dialog.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TuiDestroyService],
})
export class MessageSendDialogComponent implements OnInit {
	readonly form = this.formBuilder.group({
		key: [null, requiredValidatorFactory(KEY_REQUIRED_ERROR)],
		content: [null, requiredValidatorFactory(CONTENT_REQUIRED_ERROR)],
		repeat: [null],
	});

	readonly loading$ = this.facade.dialogLoading$;

	constructor(
		@Inject(POLYMORPHEUS_CONTEXT)
		private readonly context: TuiDialogContext<void, TopicShort>,
		private readonly formBuilder: FormBuilder,
		private readonly facade: MQFacade,
		private readonly destroy$: TuiDestroyService
	) {}

	@tuiPure
	get topic(): TopicShort {
		return this.context.data;
	}

	ngOnInit(): void {
		this.facade.messagesSent$
			.pipe(takeUntil(this.destroy$))
			.subscribe(() => this.closeDialog());
	}

	closeDialog() {
		this.context.completeWith();
	}

	sendMessages() {
		if (this.form.invalid) {
			tuiMarkControlAsTouchedAndValidate(this.form);
			return;
		}

		const {brokerType, topicName} = this.topic;
		const {key, content, repeat} = this.form.value as any;

		const messages = {
			brokerType,
			topicName,
			key,
			content,
			repeat: repeat || 1,
		};

		this.facade.sendMessages(messages);
	}
}
