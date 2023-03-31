import {
	ChangeDetectionStrategy,
	Component,
	Inject,
	OnInit,
} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {RestFacade, RestMockDto, RestModelShortDto} from '@mocker/rest/domain';
import {
	TuiDestroyService,
	tuiMarkControlAsTouchedAndValidate,
	tuiPure,
	TuiValidationError,
} from '@taiga-ui/cdk';
import {takeUntil, tap, withLatestFrom} from 'rxjs/operators';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import {TuiDialogContext} from '@taiga-ui/core';
import {
	AppConfig,
	ENVIRONMENT,
	patternValidatorFactory,
	requiredValidatorFactory,
} from '@mocker/shared/utils';
import {iif, Subject} from 'rxjs';

type Context = {
	path: string;
	mockId?: string;
};

const NAME_REQUIRED_ERROR = 'Укажите имя шаблона мока';
const PATH_REQUIRED_ERROR = 'Укажите путь шаблона мока';
const PATH_FORMAT_ERROR = 'Некорректный путь';
const PATH_PARAMS_ERROR = 'Параметры пути не совпадают';

const PATH_PATTERN = /^[a-zA-Z0-9]+[a-zA-Z0-9_-]*[a-zA-Z0-9]+(\/.*)?$/;
const PATH_PARAM_PATTERN = /\{[a-zA-Z0-9]+[a-zA-Z0-9_-]*[a-zA-Z0-9]+\}/g;

@Component({
	selector: 'mocker-create-mock-dialog',
	templateUrl: './create-mock-dialog.component.html',
	styleUrls: ['./create-mock-dialog.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TuiDestroyService],
})
export class CreateMockDialogComponent implements OnInit {
	readonly form = this.formBuilder.group({
		name: [null, requiredValidatorFactory(NAME_REQUIRED_ERROR)],
		description: [null],
		path: [
			null,
			[
				requiredValidatorFactory(PATH_REQUIRED_ERROR),
				patternValidatorFactory(PATH_FORMAT_ERROR, PATH_PATTERN),
			],
		],
		method: ['GET'],
		// requestModel: [null],
		responseModel: [null],
		requestHeaders: [[] as string[]],
		responseHeaders: [[] as string[]],
		queryParams: [[] as string[]],
		pathParams: [[] as string[]],
	});

	readonly mock$ = this.facade.getMock(this.servicePath, this.mockId!).pipe(
		withLatestFrom(this.facade.models$),
		tap(([mock, models]) => {
			this.form.patchValue({
				...mock,
				responseModel: models?.find(
					model => model.modelId === mock.responseModelId
				),
			} as any);
			this.form.controls.path.disable();
			this.form.controls.requestHeaders.disable();
			this.form.controls.responseHeaders.disable();
			this.form.controls.queryParams.disable();
			this.form.controls.pathParams.disable();
		})
	);

	readonly methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

	readonly models$ = this.facade.models$;

	readonly loading$ = this.facade.dialogLoading$;

	readonly mockUrl = `${this.appConfig.gatewayUrl}/rest/${this.servicePath}/{path}`;

	readonly pathError$ = new Subject<TuiValidationError | null>();

	readonly modelIdentityMatcher = (
		a: RestModelShortDto,
		b: RestModelShortDto
	) => a.modelId === b.modelId;

	constructor(
		@Inject(ENVIRONMENT) private readonly appConfig: AppConfig,
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
	get mockId(): string | null {
		const {mockId} = this.context.data;
		return mockId !== undefined ? mockId : null;
	}

	@tuiPure
	get headerText() {
		return this.mockId !== null
			? 'Редактирование шаблона мока'
			: 'Новый шаблон мока';
	}

	@tuiPure
	get submitText() {
		return this.mockId !== null ? 'Редактировать' : 'Создать';
	}

	get validatePath(): boolean {
		if (this.form.controls.path.invalid) {
			this.pathError$.next(null);
			return false;
		}

		const {pathParams, path} = this.form.value as any;
		const paramsInPath =
			(path as string)
				.match(PATH_PARAM_PATTERN)
				?.map(value => value.slice(1, value.length - 1)) || [];

		if (paramsInPath.length !== pathParams.length) {
			this.pathError$.next(new TuiValidationError(PATH_PARAMS_ERROR));
			return false;
		}

		const onlyValidInPath = paramsInPath.every(value =>
			pathParams.includes(value)
		);
		const allParamsIncluded = pathParams.every((value: string) =>
			paramsInPath.includes(value)
		);

		if (!onlyValidInPath || !allParamsIncluded) {
			this.pathError$.next(new TuiValidationError(PATH_PARAMS_ERROR));
			return false;
		}

		this.pathError$.next(null);
		return true;
	}

	ngOnInit(): void {
		iif(
			() => this.mockId != null,
			this.facade.mockEdited$,
			this.facade.mockCreated$
		)
			.pipe(takeUntil(this.destroy$))
			.subscribe(() => this.closeDialog());
	}

	closeDialog() {
		this.context.completeWith();
	}

	submitMock() {
		if (this.mockId !== null) {
			this.editModel();
			return;
		}

		const pathValid = this.validatePath;
		if (this.form.invalid || !pathValid) {
			tuiMarkControlAsTouchedAndValidate(this.form);
			return;
		}

		const {
			name,
			description,
			path,
			method,
			// requestModel,
			responseModel,
			requestHeaders,
			responseHeaders,
			queryParams,
			pathParams,
		} = this.form.value as any;

		const mock: RestMockDto = {
			name,
			description,
			path,
			method,
			// requestModelId: requestModel?.modelId,
			responseModelId: responseModel?.modelId,
			requestHeaders,
			responseHeaders,
			queryParams,
			pathParams,
		};

		this.facade.createMock(this.servicePath, mock);
	}

	editModel() {
		if (this.form.invalid) {
			tuiMarkControlAsTouchedAndValidate(this.form);
			return;
		}

		const {
			name,
			description,
			method,
			// requestModel,
			responseModel,
		} = this.form.value as any;

		const mock: Partial<RestMockDto> = {
			mockId: this.mockId!,
			name,
			description,
			method,
			// requestModelId: requestModel?.modelId,
			responseModelId: responseModel?.modelId,
		};

		this.facade.editMock(this.servicePath, mock);
	}
}
