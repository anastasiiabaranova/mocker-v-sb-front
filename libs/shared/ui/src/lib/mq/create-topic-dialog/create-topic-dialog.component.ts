import {
	ChangeDetectionStrategy,
	Component,
	Inject,
	OnInit,
} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {
	maxLengthValidatorFactory,
	patternValidatorFactory,
	requiredValidatorFactory,
} from '@mocker/shared/utils';
import {
	TuiDestroyService,
	tuiMarkControlAsTouchedAndValidate,
} from '@taiga-ui/cdk';
import {TuiDialogContext} from '@taiga-ui/core';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import {BrokerType, MQFacade, Topic} from '@mocker/mq/domain';
import {takeUntil} from 'rxjs/operators';

const NAME_REQUIRED_ERROR = 'Укажите имя топика';
const NAME_LENGTH_ERROR = 'Имя топика — до 249 символов';
const NAME_FORMAT_ERROR =
	'Используйте только латинские буквы, цифры и символы ._-';
const BROKER_TYPE_REQUIRED_ERROR = 'Выберите тип брокера';

const NAME_PATTERN = /^[a-zA-Z0-9._-]+$/;

@Component({
	selector: 'mocker-create-topic-dialog',
	templateUrl: './create-topic-dialog.component.html',
	styleUrls: ['./create-topic-dialog.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TuiDestroyService],
})
export class CreateTopicDialogComponent implements OnInit {
	readonly form = this.formBuilder.group({
		topicName: [
			null,
			[
				requiredValidatorFactory(NAME_REQUIRED_ERROR),
				patternValidatorFactory(NAME_FORMAT_ERROR, NAME_PATTERN),
				maxLengthValidatorFactory(NAME_LENGTH_ERROR, 249),
			],
		],
		brokerType: [
			null,
			requiredValidatorFactory(BROKER_TYPE_REQUIRED_ERROR),
		],
	});

	readonly loading$ = this.facade.dialogLoading$;

	readonly brokerTypes = [BrokerType.Kafka, BrokerType.Rabbit];

	constructor(
		@Inject(POLYMORPHEUS_CONTEXT)
		private readonly context: TuiDialogContext<void, Topic>,
		private readonly formBuilder: FormBuilder,
		private readonly facade: MQFacade,
		private readonly destroy$: TuiDestroyService
	) {}

	ngOnInit(): void {
		this.facade.topicCreated$
			.pipe(takeUntil(this.destroy$))
			.subscribe(() => this.closeDialog());
	}

	closeDialog() {
		this.context.completeWith();
	}

	submitTopic() {
		if (this.form.invalid) {
			tuiMarkControlAsTouchedAndValidate(this.form);
			return;
		}

		const topic = this.form.value as any;

		this.facade.createTopic(topic);
	}
}
