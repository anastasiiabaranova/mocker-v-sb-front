import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {FormArray, FormBuilder, FormControl} from '@angular/forms';
import {
	RestResponseApiService,
	RestMockDto,
	RestResponseDto,
} from '@mocker/rest/domain';
import {
	NotificationsFacade,
	requiredValidatorFactory,
} from '@mocker/shared/utils';
import {
	TuiDestroyService,
	tuiMarkControlAsTouchedAndValidate,
	TuiValidationError,
} from '@taiga-ui/cdk';
import {TuiDialogContext, TuiNotification} from '@taiga-ui/core';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import {BehaviorSubject, takeUntil} from 'rxjs';

type Context = {
	mock: RestMockDto;
	servicePath: string;
};

const NAME_REQUIRED_ERROR = 'Укажите название ответа';
const STATUS_REQUIRED_ERROR = 'Укажите Status Code ответа';
const HEADER_VALUE_REQUIRED_ERROR = 'Укажите значение заголовка';
const PARAM_VALUE_REQUIRED_ERROR = 'Укажите значение параметра';
const BODY_SYNTAX_ERROR = 'Проверьте синтаксис';
const BODY_REQUIRED_ERROR = 'Укажите тело ответа';

@Component({
	selector: 'mocker-create-response-dialog',
	templateUrl: './create-response-dialog.component.html',
	styleUrls: ['./create-response-dialog.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateResponseDialogComponent {
	readonly form = this.formBuilder.group({
		name: [null, requiredValidatorFactory(NAME_REQUIRED_ERROR)],
		statusCode: [null, requiredValidatorFactory(STATUS_REQUIRED_ERROR)],
		requestHeaders: this.requestHeadersControls,
		responseHeaders: this.responseHeadersControls,
		queryParams: this.queryParamsControls,
		pathParams: this.pathParamsControls,
	});

	readonly requestHeaders = this.form.controls.requestHeaders
		.controls as FormControl[];

	readonly responseHeaders = this.form.controls.responseHeaders
		.controls as FormControl[];

	readonly queryParams = this.form.controls.queryParams
		.controls as FormControl[];

	readonly pathParams = this.form.controls.pathParams
		.controls as FormControl[];

	readonly codeModel = {
		language: 'json',
		uri: 'main.json',
		value: '{}',
	};

	readonly schemaError$ = new BehaviorSubject<TuiValidationError | null>(
		null
	);

	readonly loading$ = new BehaviorSubject<boolean>(false);

	step = 0;

	firstStepState = 'normal' as 'error' | 'normal' | 'pass';
	secondStepState = 'normal' as 'error' | 'normal' | 'pass';
	thirdStepState = 'normal' as 'error' | 'normal' | 'pass';

	readonly getSubmitText = (step: number) =>
		step === 2 ? 'Создать' : 'Далее';

	constructor(
		@Inject(POLYMORPHEUS_CONTEXT)
		private readonly context: TuiDialogContext<boolean, Context>,
		private readonly formBuilder: FormBuilder,
		private readonly destroy$: TuiDestroyService,
		private readonly notificationsFacade: NotificationsFacade,
		private readonly responseApiService: RestResponseApiService
	) {}

	get mock(): RestMockDto {
		return this.context.data.mock;
	}

	get servicePath(): string {
		return this.context.data.servicePath;
	}

	private get requestHeadersControls(): FormArray {
		return this.formBuilder.array(
			this.mock.requestHeaders.map(() =>
				this.formBuilder.control(
					null,
					requiredValidatorFactory(HEADER_VALUE_REQUIRED_ERROR)
				)
			)
		);
	}

	private get responseHeadersControls(): FormArray {
		return this.formBuilder.array(
			this.mock.responseHeaders.map(() =>
				this.formBuilder.control(
					null,
					requiredValidatorFactory(HEADER_VALUE_REQUIRED_ERROR)
				)
			)
		);
	}

	private get queryParamsControls(): FormArray {
		return this.formBuilder.array(
			this.mock.queryParams.map(() =>
				this.formBuilder.control(
					null,
					requiredValidatorFactory(PARAM_VALUE_REQUIRED_ERROR)
				)
			)
		);
	}

	private get pathParamsControls(): FormArray {
		return this.formBuilder.array(
			this.mock.pathParams.map(() =>
				this.formBuilder.control(
					null,
					requiredValidatorFactory(PARAM_VALUE_REQUIRED_ERROR)
				)
			)
		);
	}

	private get validateResponseBody(): string | null {
		const body = this.codeModel.value;

		if (!body) {
			this.schemaError$.next(new TuiValidationError(BODY_REQUIRED_ERROR));
			return null;
		}

		try {
			const json = JSON.parse(body);

			this.schemaError$.next(null);

			return JSON.stringify(json);
		} catch {
			this.schemaError$.next(new TuiValidationError(BODY_SYNTAX_ERROR));
			return null;
		}
	}

	closeDialog(created: boolean = false) {
		this.context.completeWith(created);
	}

	submitForm() {
		if (this.step !== 2) {
			this.goToStep(this.step + 1);
			return;
		}

		const responseContent = this.validateResponseBody;

		if (this.form.invalid || !responseContent) {
			tuiMarkControlAsTouchedAndValidate(this.form);
			this.notificationsFacade.showNotification({
				content: 'Исправьте ошибки и попробуйте снова',
				status: TuiNotification.Error,
			});
			return;
		}

		const {name, statusCode} = this.form.value as any;

		const requestHeaders = this.form.value.requestHeaders.map(
			(value: any, i: number) => ({
				value,
				name: this.mock.requestHeaders[i],
			})
		);

		const responseHeaders = this.form.value.responseHeaders.map(
			(value: any, i: number) => ({
				value,
				name: this.mock.responseHeaders[i],
			})
		);

		const queryParams = this.form.value.queryParams.map(
			(value: any, i: number) => ({
				value,
				name: this.mock.queryParams[i],
			})
		);

		const pathParams = this.form.value.pathParams.map(
			(value: any, i: number) => ({
				value,
				name: this.mock.pathParams[i],
			})
		);

		const response: RestResponseDto = {
			name,
			statusCode,
			responseContent,
			responseHeaders,
			requestHeaders,
			queryParams,
			pathParams,
		};

		this.loading$.next(true);

		this.responseApiService
			.createResponse(this.servicePath, this.mock.mockId!, response)
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: () => this.closeDialog(true),
				error: () => {
					this.notificationsFacade.showNotification({
						label: 'Не удалось создать статический ответ',
						content: 'Попробуйте еще раз позже',
						status: TuiNotification.Error,
					});
					this.loading$.next(false);
				},
			});
	}

	goToStep(step: number) {
		if (step === this.step) {
			return;
		}

		this.recalculateStepsStates();
		this.step = step;
		this.validateCurrentStep();
	}

	private recalculateStepsStates() {
		if (this.step === 0) {
			const body = this.validateResponseBody;

			this.firstStepState =
				this.form.controls.name.invalid ||
				this.form.controls.statusCode.invalid ||
				!body
					? 'error'
					: 'pass';
			return;
		}

		if (this.step === 1) {
			this.secondStepState =
				this.form.controls.requestHeaders.invalid ||
				this.form.controls.responseHeaders.invalid
					? 'error'
					: 'pass';
			return;
		}

		this.thirdStepState =
			this.form.controls.queryParams.invalid ||
			this.form.controls.pathParams.invalid
				? 'error'
				: 'pass';
	}

	private validateCurrentStep() {
		if (this.step === 0 && this.firstStepState === 'error') {
			tuiMarkControlAsTouchedAndValidate(this.form.controls.name);
			tuiMarkControlAsTouchedAndValidate(this.form.controls.statusCode);
			return;
		}

		if (this.step === 1 && this.secondStepState === 'error') {
			tuiMarkControlAsTouchedAndValidate(
				this.form.controls.requestHeaders
			);
			tuiMarkControlAsTouchedAndValidate(
				this.form.controls.responseHeaders
			);
			return;
		}

		if (this.step === 2 && this.thirdStepState === 'error') {
			tuiMarkControlAsTouchedAndValidate(this.form.controls.queryParams);
			tuiMarkControlAsTouchedAndValidate(this.form.controls.pathParams);
			return;
		}
	}
}