import {
	ChangeDetectionStrategy,
	Component,
	Inject,
	OnInit,
} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {
	AppConfig,
	ENVIRONMENT,
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
import {TuiDialogContext} from '@taiga-ui/core';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import {GraphQLFacade, GraphQLServiceDto} from '@mocker/graphql/domain';
import {debounceTime, map, switchMap, takeUntil} from 'rxjs/operators';
import {iif, of} from 'rxjs';

const NAME_REQUIRED_ERROR = 'Укажите имя сервиса';
const NAME_FORMAT_ERROR = 'Некорректный формат имени';
const NAME_OCCUPIED_ERROR = 'Имя уже используется';
const URL_REQUIRED_ERROR = 'Укажите URL для редиректа';
const URL_FORMAT_ERROR = 'Некорректный формат URL';

const NAME_PATTERN = /^[a-zA-Z0-9_-]{3,255}$/;

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
			[
				requiredValidatorFactory(NAME_REQUIRED_ERROR),
				patternValidatorFactory(NAME_FORMAT_ERROR, NAME_PATTERN),
			],
		],
		location: [
			this.service?.location || null,
			[
				requiredValidatorFactory(URL_REQUIRED_ERROR),
				urlValidatorFactory(URL_FORMAT_ERROR),
			],
		],
		makeRealCall: [this.service?.makeRealCall || false],
		delay: [this.service ? this.service.delay : null],
		expirationDate: [this.expirationDate || null],
	});

	readonly codeModel = {
		language: 'graphql',
		uri: 'main.graphql',
		value: this.service?.schema || '',
	};

	readonly minDateTime = [
		TuiDay.currentLocal().append({day: 1}),
		new TuiTime(0, 0),
	] as [TuiDay, TuiTime];

	readonly mockServiceUrl = `${this.appConfig.gatewayUrl}/graphql/{name}`;

	readonly loading$ = this.facade.dialogLoading$;

	readonly nameError$ = this.form.controls.name.valueChanges.pipe(
		debounceTime(300),
		switchMap(name =>
			iif(() => !!name, this.facade.verifyName(name!), of(true))
		),
		map(available =>
			available ? null : new TuiValidationError(NAME_OCCUPIED_ERROR)
		)
	);

	constructor(
		@Inject(ENVIRONMENT) private readonly appConfig: AppConfig,
		@Inject(POLYMORPHEUS_CONTEXT)
		private readonly context: TuiDialogContext<void, GraphQLServiceDto>,
		private readonly formBuilder: FormBuilder,
		private readonly facade: GraphQLFacade,
		private readonly destroy$: TuiDestroyService
	) {}

	@tuiPure
	get service(): GraphQLServiceDto {
		return this.context.data;
	}

	get expirationDate(): [TuiDay, TuiTime] | null {
		if (!this.service || !this.service.expirationDate) {
			return null;
		}

		const date = new Date(this.service.expirationDate);

		return [
			TuiDay.fromLocalNativeDate(date),
			TuiTime.fromLocalNativeDate(date),
		];
	}

	@tuiPure
	get headerText() {
		return this.service
			? 'Редактирование GraphQL сервиса'
			: 'Новый GraphQL сервис';
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
		const schema = this.codeModel.value;
		const service = Object.assign(
			{...initialValue},
			{...this.form.value, schema}
		) as any;

		const [date, time] = this.form.value.expirationDate || [];

		if (date) {
			const expirationDate = date.toLocalNativeDate();

			if (time) {
				expirationDate.setHours(time.hours);
				expirationDate.setMinutes(time.minutes);
			}

			service.expirationDate = expirationDate.toISOString();
		}

		if (this.service) {
			this.facade.editService(service);
		} else {
			this.facade.createService(service);
		}
	}
}
