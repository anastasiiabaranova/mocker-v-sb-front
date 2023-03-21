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
	patternValidatorFactory,
	requiredValidatorFactory,
} from '@mocker/shared/utils';
import {
	TuiDay,
	TuiDestroyService,
	tuiMarkControlAsTouchedAndValidate,
	tuiPure,
	TuiTime,
} from '@taiga-ui/cdk';
import {TuiDialogContext} from '@taiga-ui/core';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import {iif} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

const NAME_REQUIRED_ERROR = 'Укажите имя сервиса';
const PATH_REQUIRED_ERROR = 'Укажите путь сервиса';
const PATH_FORMAT_ERROR = 'Некорректный путь';
const PATH_FORBIDDEN_ERROR = 'Запрещенный путь';

const PATH_PATTERN = /^[a-zA-Z0-9]+[a-zA-Z0-9_-]*[a-zA-Z0-9]+$/;
const FORBIDDEN_PATH = 'service';

@Component({
	selector: 'mocker-create-service-dialog',
	templateUrl: './create-service-dialog.component.html',
	styleUrls: ['./create-service-dialog.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TuiDestroyService],
})
export class CreateServiceDialogComponent implements OnInit {
	readonly form = this.formBuilder.group({
		name: [
			this.service?.name || null,
			requiredValidatorFactory(NAME_REQUIRED_ERROR),
		],
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
		description: [this.service?.description || null],
	});

	readonly minDateTime = [
		TuiDay.currentLocal().append({day: 1}),
		new TuiTime(0, 0),
	] as [TuiDay, TuiTime];

	readonly mockServiceUrl = `${this.appConfig.serverUrl}/rest/{path}`;

	readonly loading$ = this.facade.dialogLoading$;

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
		const service = Object.assign(
			{...initialValue},
			this.form.value
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
