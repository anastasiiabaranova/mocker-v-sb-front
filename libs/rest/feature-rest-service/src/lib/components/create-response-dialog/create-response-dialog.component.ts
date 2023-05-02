import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {FormArray, FormBuilder, FormControl} from '@angular/forms';
import {
	RestResponseApiService,
	RestMockDto,
	RestResponseDto,
	RequestParamDto,
} from '@mocker/rest/domain';
import {
	NotificationsFacade,
	requiredValidatorFactory,
	statusCodeValidatorFactory,
} from '@mocker/shared/utils';
import {
	TuiDestroyService,
	tuiMarkControlAsTouchedAndValidate,
	tuiPure,
	TuiValidationError,
	TUI_IS_MOBILE,
} from '@taiga-ui/cdk';
import {TuiDialogContext, TuiNotification} from '@taiga-ui/core';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import {BehaviorSubject, Observable, takeUntil} from 'rxjs';

type Context = {
	mock: RestMockDto;
	servicePath: string;
	response?: RestResponseDto;
};

const NAME_REQUIRED_ERROR = 'Укажите название ответа';
const STATUS_REQUIRED_ERROR = 'Укажите Status Code ответа';
const STATUS_INVALID_ERROR = 'Некорректный Status Code';
const HEADER_VALUE_REQUIRED_ERROR = 'Укажите значение заголовка';
const PARAM_VALUE_REQUIRED_ERROR = 'Укажите значение параметра';

function findValue(
	key: string,
	values?: ReadonlyArray<RequestParamDto>
): string | null {
	return values?.find(({name}) => name === key)?.value || null;
}

@Component({
	selector: 'mocker-create-response-dialog',
	templateUrl: './create-response-dialog.component.html',
	styleUrls: ['./create-response-dialog.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateResponseDialogComponent {
	readonly form = this.formBuilder.group({
		name: [
			this.response?.name || null,
			requiredValidatorFactory(NAME_REQUIRED_ERROR),
		],
		statusCode: [
			this.response?.statusCode || null,
			[
				requiredValidatorFactory(STATUS_REQUIRED_ERROR),
				statusCodeValidatorFactory(STATUS_INVALID_ERROR),
			],
		],
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
		language: 'txt',
		uri: 'main.txt',
		value: this.response?.responseContent || '',
	};

	readonly schemaError$ = new BehaviorSubject<TuiValidationError | null>(
		null
	);

	readonly loading$ = new BehaviorSubject<boolean>(false);

	readonly showHeaders =
		!!this.mock.requestHeaders.length || !!this.mock.responseHeaders.length;
	readonly showParams =
		!!this.mock.queryParams.length || !!this.mock.pathParams.length;

	step = 0;

	firstStepState = 'normal' as 'error' | 'normal' | 'pass';
	secondStepState = 'normal' as 'error' | 'normal' | 'pass';
	thirdStepState = 'normal' as 'error' | 'normal' | 'pass';

	readonly getSubmitText = () => (this.lastStep ? this.submitText : 'Далее');

	constructor(
		@Inject(POLYMORPHEUS_CONTEXT)
		private readonly context: TuiDialogContext<boolean, Context>,
		@Inject(TUI_IS_MOBILE) readonly isMobile: boolean,
		private readonly formBuilder: FormBuilder,
		private readonly destroy$: TuiDestroyService,
		private readonly notificationsFacade: NotificationsFacade,
		private readonly responseApiService: RestResponseApiService
	) {}

	@tuiPure
	get mock(): RestMockDto {
		return this.context.data.mock;
	}

	@tuiPure
	get servicePath(): string {
		return this.context.data.servicePath;
	}

	@tuiPure
	get response(): RestResponseDto | null {
		return this.context.data.response || null;
	}

	@tuiPure
	get headerText() {
		return this.mock
			? 'Редактирование статического ответа'
			: 'Новый статический ответ';
	}

	@tuiPure
	get submitText() {
		return this.mock ? 'Редактировать' : 'Создать';
	}

	private get requestHeadersControls(): FormArray {
		return this.formBuilder.array(
			this.mock.requestHeaders.map(name =>
				this.formBuilder.control(
					findValue(name, this.response?.requestHeaders),
					requiredValidatorFactory(HEADER_VALUE_REQUIRED_ERROR)
				)
			)
		);
	}

	private get responseHeadersControls(): FormArray {
		return this.formBuilder.array(
			this.mock.responseHeaders.map(name =>
				this.formBuilder.control(
					findValue(name, this.response?.responseHeaders),
					requiredValidatorFactory(HEADER_VALUE_REQUIRED_ERROR)
				)
			)
		);
	}

	private get queryParamsControls(): FormArray {
		return this.formBuilder.array(
			this.mock.queryParams.map(name =>
				this.formBuilder.control(
					findValue(name, this.response?.queryParams),
					requiredValidatorFactory(PARAM_VALUE_REQUIRED_ERROR)
				)
			)
		);
	}

	private get pathParamsControls(): FormArray {
		return this.formBuilder.array(
			this.mock.pathParams.map(name =>
				this.formBuilder.control(
					findValue(name, this.response?.pathParams),
					requiredValidatorFactory(PARAM_VALUE_REQUIRED_ERROR)
				)
			)
		);
	}

	private get lastStep(): boolean {
		if (!this.showHeaders && !this.showParams) {
			return true;
		}

		if (!this.showParams) {
			return this.step === 1;
		}

		return this.step === 2;
	}

	private get nextStep(): number {
		return this.showHeaders ? this.step + 1 : this.step + 2;
	}

	closeDialog(created: boolean = false) {
		this.context.completeWith(created);
	}

	submitForm() {
		if (!this.lastStep) {
			this.goToStep(this.nextStep);
			return;
		}

		if (this.form.invalid) {
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

		const responseContent = this.codeModel.value;

		const responseId = this.response?.responseId;

		const response: RestResponseDto = {
			...(responseId && {responseId}),
			name,
			statusCode,
			responseContent,
			responseHeaders,
			requestHeaders,
			queryParams,
			pathParams,
		};

		this.loading$.next(true);

		this.submitResponse(response)
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: () => this.closeDialog(true),
				error: () => {
					this.notificationsFacade.showNotification({
						label: `Не удалось ${
							this.response ? 'отредактировать' : 'создать'
						} статический ответ`,
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

	private submitResponse(response: RestResponseDto): Observable<void> {
		return this.response
			? this.responseApiService.editResponse(
					this.servicePath,
					this.mock.mockId!,
					response
			  )
			: this.responseApiService.createResponse(
					this.servicePath,
					this.mock.mockId!,
					response
			  );
	}

	private recalculateStepsStates() {
		if (this.step === 0) {
			this.firstStepState =
				this.form.controls.name.invalid ||
				this.form.controls.statusCode.invalid
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
