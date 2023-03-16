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
import toJsonSchema from 'to-json-schema';

type Schema = {
	title: string;
	description: string;
	body: any;
};

const DEFAULT_SCHEMA = {
	title: '',
	description: '',
	body: {},
};

const NAME_ERROR = 'Укажите имя модели';
const SCHEMA_TITLE_ERROR = 'Укажите имя схемы';
const BODY_SYNTAX_ERROR = 'Проверьте синтаксис';
const BODY_REQUIRED_ERROR = 'Укажите пример body';

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
		schemaTitle: [null, requiredValidatorFactory(SCHEMA_TITLE_ERROR)],
		schemaDescription: [null],
	});

	readonly bodyCodeModel = {
		language: 'json',
		uri: 'body.json',
		value: '',
	};

	readonly schema: Schema = DEFAULT_SCHEMA;

	schemaCodeModel = {
		language: 'json',
		uri: 'schema.json',
		value: this.strigifySchema(this.schema),
	};

	readonly options = {
		lineNumbers: false,
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

		this.form.controls.schemaTitle.valueChanges
			.pipe(takeUntil(this.destroy$))
			.subscribe(title => this.updateSchema({title: title || ''}));

		this.form.controls.schemaDescription.valueChanges
			.pipe(takeUntil(this.destroy$))
			.subscribe(description =>
				this.updateSchema({description: description || ''})
			);
	}

	closeDialog() {
		this.context.completeWith();
	}

	submitModel() {
		const schemaInvalid = !this.verifySchema();

		if (this.form.invalid || schemaInvalid) {
			tuiMarkControlAsTouchedAndValidate(this.form);
			return;
		}

		const {name, description} = this.form.value as any;

		const model = {
			name,
			description,
			schema: JSON.stringify(this.schema),
		};

		this.facade.createModel(this.context.data, model);
	}

	updateSchema(data: Partial<Schema>) {
		const {title, description, body} = this.schema;

		this.schema.title = data.title || title;
		this.schema.description = data.description || description;
		this.schema.body = data.body || body;

		this.schemaCodeModel = {
			...this.schemaCodeModel,
			value: this.strigifySchema(this.schema),
		};
	}

	updateSchemaBody(body: string) {
		const json = this.toSchema(body);

		this.updateSchema({body: json});
	}

	private toSchema(body: string): any | null {
		if (!body) {
			this.schemaError$.next(new TuiValidationError(BODY_REQUIRED_ERROR));
			return null;
		}

		try {
			const json = JSON.parse(body);

			this.schemaError$.next(null);

			return toJsonSchema(json, {required: true});
		} catch {
			this.schemaError$.next(new TuiValidationError(BODY_SYNTAX_ERROR));
			return null;
		}
	}

	private verifySchema(): boolean {
		return !!this.toSchema(this.bodyCodeModel.value);
	}

	private strigifySchema(schema: any): string {
		return JSON.stringify(schema, null, 4);
	}
}
