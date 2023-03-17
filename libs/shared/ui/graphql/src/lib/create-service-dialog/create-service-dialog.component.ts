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
import {GraphQLFacade, GraphQLServiceDto} from '@mocker/graphql/domain';
import {takeUntil} from 'rxjs/operators';

const NAME_REQUIRED_ERROR = 'Укажите имя сервиса';
const NAME_FORMAT_ERROR = 'Некорректный формат имени';
const URL_REQUIRED_ERROR = 'Укажите URL для редиректа';
const URL_FORMAT_ERROR = 'Некорректный формат URL';

const NAME_PATTERN = /^[a-zA-Z0-9_-]{3,255}$/;
const URL_PATTERN =
	/\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()[\]{};:'".,<>?«»“”‘’]))/i;

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
				patternValidatorFactory(URL_FORMAT_ERROR, URL_PATTERN),
			],
		],
		makeRealCall: [this.service?.makeRealCall || false],
		delay: [this.service?.delay || null],
		expirationDate: [this.expirationDate || null],
	});

	readonly codeModel = {
		language: 'graphql',
		uri: 'main.graphql',
		value: this.service?.schema || '',
	};

	readonly minDateTime = [
		TuiDay.currentLocal(),
		TuiTime.currentLocal().shift({hours: 1}),
	] as [TuiDay, TuiTime];

	readonly mockServiceUrl = `${this.appConfig.serverUrl}/graphql/{name}`;

	readonly loading$ = this.facade.dialogLoading$;

	constructor(
		@Inject(ENVIRONMENT) private readonly appConfig: AppConfig,
		@Inject(POLYMORPHEUS_CONTEXT)
		private readonly context: TuiDialogContext<void, GraphQLServiceDto>,
		private readonly formBuilder: FormBuilder,
		private readonly facade: GraphQLFacade,
		private readonly destroy$: TuiDestroyService
	) {}

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
		if (this.service) {
			this.facade.serviceEdited$
				.pipe(takeUntil(this.destroy$))
				.subscribe(() => this.closeDialog());

			return;
		}

		this.facade.serviceCreated$
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

		if (this.form.value.expirationDate) {
			const date = this.form.value.expirationDate[0] as TuiDay;
			const time = this.form.value.expirationDate[1] as TuiTime;
			const expirationDate = date.toLocalNativeDate();

			expirationDate.setHours(time.hours);
			expirationDate.setMinutes(time.minutes);

			service.expirationDate = expirationDate.toISOString();
		}

		if (this.service) {
			this.facade.editService(service);
		} else {
			this.facade.createService(service);
		}
	}
}
