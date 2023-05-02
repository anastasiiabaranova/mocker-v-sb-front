import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {OperarionType, TriggerDto} from '@mocker/graphql/domain';
import {
	patternValidatorFactory,
	requiredValidatorFactory,
} from '@mocker/shared/utils';
import {tuiMarkControlAsTouchedAndValidate} from '@taiga-ui/cdk';

const PATH_REQUIRED_ERROR = 'Укажите путь';
const PATH_FORMAT_ERROR = 'Проверьте формат пути';
const OPERATION_REQUIRED_ERROR = 'Выберите операцию';
const VALUE_REQUIRED_ERROR = 'Укажите значение';

const PATH_REGEXP = /^(\['.+'\])+$/;

@Component({
	selector: 'mocker-graphql-trigger-form',
	templateUrl: './graphql-trigger-form.component.html',
	styleUrls: ['./graphql-trigger-form.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphqlTriggerFormComponent {
	@Input() mockId!: string;

	@Output() readonly createTrigger = new EventEmitter<TriggerDto | null>();

	readonly form = this.fromBuilder.group({
		path: [
			null,
			[
				requiredValidatorFactory(PATH_REQUIRED_ERROR),
				patternValidatorFactory(PATH_FORMAT_ERROR, PATH_REGEXP),
			],
		],
		operation: [null, requiredValidatorFactory(OPERATION_REQUIRED_ERROR)],
		value: [null, requiredValidatorFactory(VALUE_REQUIRED_ERROR)],
		enable: [true],
	});

	readonly operations = [
		OperarionType.Equal,
		OperarionType.Greater,
		OperarionType.GreaterOrEqual,
		OperarionType.Less,
		OperarionType.LessOrEqual,
		OperarionType.Regex,
	];

	readonly stringifyOperation = (operation: OperarionType) => {
		switch (operation) {
			case OperarionType.Equal:
				return '=';
			case OperarionType.Greater:
				return '>';
			case OperarionType.GreaterOrEqual:
				return '≥';
			case OperarionType.Less:
				return '<';
			case OperarionType.LessOrEqual:
				return '≤';
			case OperarionType.Regex:
				return 'Regex';
		}
	};

	constructor(private readonly fromBuilder: FormBuilder) {}

	submitTrigger() {
		if (this.form.invalid) {
			tuiMarkControlAsTouchedAndValidate(this.form);
			return;
		}

		this.createTrigger.next({
			...this.form.value,
			mockId: this.mockId,
		} as any);
	}

	closeForm() {
		this.createTrigger.next(null);
	}
}
