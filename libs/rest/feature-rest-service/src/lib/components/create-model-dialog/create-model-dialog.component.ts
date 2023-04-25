import {
	ChangeDetectionStrategy,
	Component,
	Inject,
	OnInit,
} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ResponseType, RestFacade} from '@mocker/rest/domain';
import {requiredValidatorFactory} from '@mocker/shared/utils';
import {
	TuiDestroyService,
	tuiMarkControlAsTouchedAndValidate,
	tuiPure,
} from '@taiga-ui/cdk';
import {TuiDialogContext} from '@taiga-ui/core';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import {iif, takeUntil, tap} from 'rxjs';

type Context = Readonly<{
	path: string;
	modelId?: string;
}>;

const NAME_ERROR = 'Укажите имя модели';

const RESPONSE_TYPES_MAP = {
	[ResponseType.JsonTemplate]: 'JSON шаблон',
	[ResponseType.Json]: 'JSON',
	[ResponseType.Plaintext]: 'Текст',
	[ResponseType.Xml]: 'XML',
};

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
		responseType: [ResponseType.JsonTemplate],
	});

	readonly responseTypeControl = this.form.controls.responseType;

	readonly model$ = this.facade
		.getModel(this.servicePath, this.modelId!)
		.pipe(
			tap(model => {
				this.form.patchValue(model as any);
				this.bodyCodeModel = {
					...this.bodyCodeModel,
					value: model.responseContent,
				};
			})
		);

	readonly responseTypes = [
		ResponseType.JsonTemplate,
		ResponseType.Json,
		ResponseType.Plaintext,
		ResponseType.Xml,
	];

	readonly loading$ = this.facade.dialogLoading$;

	bodyCodeModel = {
		language: 'txt',
		uri: 'body.txt',
		value: '',
	};

	readonly getDisplayResponseType = (responseType: ResponseType) =>
		RESPONSE_TYPES_MAP[responseType];

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
		if (this.form.invalid) {
			tuiMarkControlAsTouchedAndValidate(this.form);
			return;
		}

		const {name, description, responseType} = this.form.value as any;
		const {modelId} = this;

		const model = {
			name,
			description,
			responseType,
			responseContent: this.bodyCodeModel.value,
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
}
