import {
	ChangeDetectionStrategy,
	Component,
	Inject,
	OnInit,
} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {RestFacade, RestServiceDto} from '@mocker/rest/domain';
import {
	AppConfig,
	ENVIRONMENT,
	forbiddenValueValidatorFactory,
	maxLengthValidatorFactory,
	patternValidatorFactory,
	requiredValidatorFactory,
	urlValidatorFactory,
} from '@mocker/shared/utils';
import {
	TuiDay,
	TuiDestroyService,
	tuiMarkControlAsTouchedAndValidate,
	tuiPure,
	TuiTime,
	TuiValidationError,
} from '@taiga-ui/cdk';
import {TuiDialogContext, tuiFadeIn, tuiHeightCollapse} from '@taiga-ui/core';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import {iif, of} from 'rxjs';
import {
	debounceTime,
	map,
	startWith,
	switchMap,
	takeUntil,
	tap,
} from 'rxjs/operators';

const NAME_REQUIRED_ERROR = 'Укажите имя сервиса';
const PATH_REQUIRED_ERROR = 'Укажите путь сервиса';
const PATH_FORMAT_ERROR = 'Некорректный путь';
const PATH_FORBIDDEN_ERROR = 'Запрещенный путь';
const PATH_OCCUPIED_ERROR = 'Путь уже используется';
const DESCRIPTION_LENGTH_ERROR = 'Используйте до 128 символов';
const URL_FORMAT_ERROR = 'Некорректный формат URL';

// TODO: обновить, когда будет стабильно на IOS
// /^\/?(?![_-])[a-zA-Z0-9_-]+(?<![_-])$/;
const PATH_PATTERN = /^\/?[a-zA-Z0-9_-]+$/;
const FORBIDDEN_PATH = 'service';

@Component({
	selector: 'mocker-create-service-dialog',
	templateUrl: './create-service-dialog.component.html',
	styleUrls: ['./create-service-dialog.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [tuiHeightCollapse, tuiFadeIn],
	providers: [TuiDestroyService],
})
export class CreateServiceDialogComponent implements OnInit {
	readonly form = this.formBuilder.group({
		name: [
			this.service?.name || null,
			requiredValidatorFactory(NAME_REQUIRED_ERROR),
		],
		url: [
			this.service?.url || null,
			[urlValidatorFactory(URL_FORMAT_ERROR)],
		],
		isProxyEnabled: [this.service?.isProxyEnabled || false],
		path: [
			this.service?.path || null,
			[
				requiredValidatorFactory(PATH_REQUIRED_ERROR),
				patternValidatorFactory(PATH_FORMAT_ERROR, PATH_PATTERN),
				forbiddenValueValidatorFactory(
					PATH_FORBIDDEN_ERROR,
					FORBIDDEN_PATH
				),
			],
		],
		expirationTime: [this.expirationTime || null],
		description: [
			this.service?.description || null,
			maxLengthValidatorFactory(DESCRIPTION_LENGTH_ERROR, 128),
		],
	});

	private readonly urlControl = this.form.controls.url;

	readonly minDateTime = [
		TuiDay.currentLocal().append({day: 1}),
		new TuiTime(0, 0),
	] as [TuiDay, TuiTime];

	readonly mockServiceUrl = `${this.appConfig.gatewayUrl}/rest/{path}`;

	readonly loading$ = this.facade.dialogLoading$;

	readonly showProxy$ = this.urlControl.valueChanges.pipe(
		startWith(this.urlControl.value),
		tap(value => !value && this.form.patchValue({isProxyEnabled: false})),
		map(value => !!value && this.urlControl.valid)
	);

	readonly pathError$ = this.form.controls.path.valueChanges.pipe(
		debounceTime(300),
		switchMap(path =>
			iif(() => !!path, this.facade.verifyPath(path!), of(true))
		),
		map(available =>
			available ? null : new TuiValidationError(PATH_OCCUPIED_ERROR)
		)
	);

	constructor(
		@Inject(ENVIRONMENT) private readonly appConfig: AppConfig,
		@Inject(POLYMORPHEUS_CONTEXT)
		private readonly context: TuiDialogContext<void, RestServiceDto>,
		private readonly formBuilder: FormBuilder,
		private readonly facade: RestFacade,
		private readonly destroy$: TuiDestroyService
	) {}

	@tuiPure
	get service(): RestServiceDto {
		return this.context.data;
	}

	get expirationTime(): [TuiDay, TuiTime] | null {
		if (!this.service || !this.service.expirationTime) {
			return null;
		}

		const date = new Date(this.service.expirationTime);

		return [
			TuiDay.fromLocalNativeDate(date),
			TuiTime.fromLocalNativeDate(date),
		];
	}

	@tuiPure
	get headerText() {
		return this.service
			? 'Редактирование REST сервиса'
			: 'Новый REST сервис';
	}

	@tuiPure
	get submitText() {
		return this.service ? 'Редактировать' : 'Создать';
	}

	ngOnInit(): void {
		iif(
			() => !!this.service,
			this.facade.serviceEdited$,
			this.facade.serviceCreated$
		)
			.pipe(takeUntil(this.destroy$))
			.subscribe(() => this.closeDialog());
	}

	closeDialog() {
		this.context.completeWith();
	}

	submitService() {
		if (this.form.invalid) {
			tuiMarkControlAsTouchedAndValidate(this.form);
			return;
		}

		const initialValue = this.service || {};
		const path = this.form.value.path?.replace('/', '');
		const service = Object.assign(
			{...initialValue},
			{
				...this.form.value,
				path,
				isHistoryEnabled: !!this.service?.isHistoryEnabled,
			}
		) as any;

		const [date, time] = this.form.value.expirationTime || [];

		if (date) {
			const expirationTime = date.toLocalNativeDate();

			if (time) {
				expirationTime.setHours(time.hours);
				expirationTime.setMinutes(time.minutes);
			}

			service.expirationTime = expirationTime.getTime();
		}

		if (this.service) {
			this.facade.editService(this.service.path, service);
		} else {
			this.facade.createService(service);
		}
	}
}
