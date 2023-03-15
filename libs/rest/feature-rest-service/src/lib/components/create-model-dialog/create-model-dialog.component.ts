import {
	ChangeDetectionStrategy,
	Component,
	Inject,
	OnInit,
} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {RestFacade} from '@mocker/rest/domain';
import {requiredValidatorFactory} from '@mocker/shared/utils';
import {
	TuiDestroyService,
	tuiMarkControlAsTouchedAndValidate,
	TuiValidationError,
} from '@taiga-ui/cdk';
import {TuiDialogContext} from '@taiga-ui/core';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import {Subject, takeUntil} from 'rxjs';

const DEFAULT_SCHEMA = {
	title: '',
	description: '',
	body: {
		type: 'object',
		schemaType: 'object',
		properties: [
			{
				id: {
					type: 'string',
				},
			},
		],
		required: ['id'],
	},
};

const NAME_ERROR = 'Укажите имя модели';
const SCHEMA_SYNTAX_ERROR = 'Проверьте синтаксис';
const SCHEMA_REQUIRED_ERROR = 'Укажите схему модели';
const SCHEMA_TITLE_ERROR = 'Укажите title схемы';
const SCHEMA_BODY_ERROR = 'Укажите body схемы';

@Component({
	selector: 'mocker-create-model-dialog',
	templateUrl: './create-model-dialog.component.html',
	styleUrls: ['./create-model-dialog.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TuiDestroyService],
})
export class CreateModelDialogComponent implements OnInit {
	readonly form = this.formBuilder.group({
		name: [null, requiredValidatorFactory(NAME_ERROR)],
		description: [null],
	});

	readonly codeModel = {
		language: 'json',
		uri: 'main.json',
		value: JSON.stringify(DEFAULT_SCHEMA, null, '\t'),
	};

	readonly loading$ = this.facade.dialogLoading$;

	readonly schemaError$ = new Subject<TuiValidationError | null>();

	constructor(
		@Inject(POLYMORPHEUS_CONTEXT)
		private readonly context: TuiDialogContext<void, string>,
		private readonly formBuilder: FormBuilder,
		private readonly facade: RestFacade,
		private readonly destroy$: TuiDestroyService
	) {}

	ngOnInit(): void {
		this.facade.modelCreated$
			.pipe(takeUntil(this.destroy$))
			.subscribe(() => this.closeDialog());
	}

	closeDialog() {
		this.context.completeWith();
	}

	submitModel() {
		if (this.form.invalid) {
			tuiMarkControlAsTouchedAndValidate(this.form);
			return;
		}

		const schema = this.validateSchema();

		if (!schema) {
			return;
		}

		const {name, description} = this.form.value as any;

		const model = {
			name,
			description,
			schema,
		};

		this.facade.createModel(this.context.data, model);
	}

	private validateSchema(): string | null {
		const {value} = this.codeModel;

		if (!value) {
			this.schemaError$.next(
				new TuiValidationError(SCHEMA_REQUIRED_ERROR)
			);
			return null;
		}

		let schema;

		try {
			schema = JSON.parse(this.codeModel.value);
		} catch {
			this.schemaError$.next(new TuiValidationError(SCHEMA_SYNTAX_ERROR));
			return null;
		}

		if (!schema.title) {
			this.schemaError$.next(new TuiValidationError(SCHEMA_TITLE_ERROR));
			return null;
		}

		if (!schema.body) {
			this.schemaError$.next(new TuiValidationError(SCHEMA_BODY_ERROR));
			return null;
		}

		this.schemaError$.next(null);

		return schema;
	}
}
