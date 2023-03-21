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
	tuiPure,
	TuiValidationError,
} from '@taiga-ui/cdk';
import {TuiDialogContext} from '@taiga-ui/core';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import {iif, Subject, takeUntil, tap} from 'rxjs';

type Context = {
	path: string;
	modelId?: string;
};

const NAME_ERROR = 'Укажите имя модели';
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
	});

	readonly model$ = this.facade
		.getModel(this.servicePath, this.modelId!)
		.pipe(
			tap(model => {
				this.form.patchValue(model as any);
				this.bodyCodeModel = {
					...this.bodyCodeModel,
					value: model.sample,
				};
			})
		);

	bodyCodeModel = {
		language: 'json',
		uri: 'body.json',
		value: '',
	};

	readonly loading$ = this.facade.dialogLoading$;

	readonly schemaError$ = new Subject<TuiValidationError | null>();

	constructor(
		@Inject(POLYMORPHEUS_CONTEXT)
		private readonly context: TuiDialogContext<void, Context>,
		private readonly formBuilder: FormBuilder,
		private readonly facade: RestFacade,
		private readonly destroy$: TuiDestroyService
	) {}

	@tuiPure
	get servicePath(): string {
		return this.context.data.path;
	}

	@tuiPure
	get modelId(): string | null {
		const {modelId} = this.context.data;
		return modelId !== undefined ? modelId : null;
	}

	@tuiPure
	get headerText() {
		return this.modelId !== null ? 'Редактирование модели' : 'Новая модель';
	}

	@tuiPure
	get submitText() {
		return this.modelId !== null ? 'Редактировать' : 'Создать';
	}

	ngOnInit(): void {
		iif(
			() => this.modelId != null,
			this.facade.modelEdited$,
			this.facade.modelCreated$
		)
			.pipe(takeUntil(this.destroy$))
			.subscribe(() => this.closeDialog());
	}

	closeDialog() {
		this.context.completeWith();
	}

	submitModel() {
		const sampleInvalid = !this.verifySample();

		if (this.form.invalid || sampleInvalid) {
			tuiMarkControlAsTouchedAndValidate(this.form);
			return;
		}

		const {name, description} = this.form.value as any;
		const {modelId} = this;

		const model = {
			name,
			description,
			sample: this.bodyCodeModel.value,
		};

		if (modelId !== null) {
			this.facade.editModel(this.servicePath, {
				...model,
				modelId,
			});
			return;
		} else {
			this.facade.createModel(this.servicePath, model);
		}
	}

	private verifySample(): boolean {
		const body = this.bodyCodeModel.value;

		if (!body) {
			this.schemaError$.next(new TuiValidationError(BODY_REQUIRED_ERROR));
			return false;
		}

		try {
			JSON.parse(body);
		} catch {
			this.schemaError$.next(new TuiValidationError(BODY_SYNTAX_ERROR));
			return false;
		}

		this.schemaError$.next(null);

		return true;
	}
}
