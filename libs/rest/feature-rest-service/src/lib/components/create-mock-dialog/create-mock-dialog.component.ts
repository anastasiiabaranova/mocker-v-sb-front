import {
	ChangeDetectionStrategy,
	Component,
	Inject,
	OnInit,
} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {RestFacade, RestMockDto} from '@mocker/rest/domain';
import {
	TuiDestroyService,
	tuiMarkControlAsTouchedAndValidate,
} from '@taiga-ui/cdk';
import {takeUntil} from 'rxjs/operators';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import {TuiDialogContext} from '@taiga-ui/core';
import {
	AppConfig,
	ENVIRONMENT,
	patternValidatorFactory,
	requiredValidatorFactory,
} from '@mocker/shared/utils';

const NAME_REQUIRED_ERROR = 'Укажите имя шаблона мока';
const PATH_REQUIRED_ERROR = 'Укажите путь шаблона мока';
const PATH_FORMAT_ERROR = 'Некорректный путь';

const PATH_PATTERN = /^[a-zA-Z0-9]+[a-zA-Z0-9_-]*[a-zA-Z0-9]+$/;

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
		requestHeaders: [null],
		responseHeaders: [null],
		queryParams: [null],
		pathParams: [null],
	});

	readonly methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

	readonly models$ = this.facade.models$;

	readonly loading$ = this.facade.dialogLoading$;

	readonly mockUrl = `${this.appConfig.serverUrl}/rest/${this.servicePath}/{path}`;

	constructor(
		@Inject(ENVIRONMENT) private readonly appConfig: AppConfig,
		@Inject(POLYMORPHEUS_CONTEXT)
		private readonly context: TuiDialogContext<void, string>,
		private readonly formBuilder: FormBuilder,
		private readonly facade: RestFacade,
		private readonly destroy$: TuiDestroyService
	) {}

	get servicePath(): string {
		return this.context.data;
	}

	ngOnInit(): void {
		this.facade.mockCreated$
			.pipe(takeUntil(this.destroy$))
			.subscribe(() => this.closeDialog());
	}

	closeDialog() {
		this.context.completeWith();
	}

	submitMock() {
		if (this.form.invalid) {
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
}
