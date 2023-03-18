import {
	ChangeDetectionStrategy,
	Component,
	Inject,
	OnInit,
} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {
	TuiDay,
	TuiDestroyService,
	tuiMarkControlAsTouchedAndValidate,
	TuiTime,
	TuiValidationError,
} from '@taiga-ui/cdk';
import {takeUntil} from 'rxjs/operators';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import {TuiDialogContext} from '@taiga-ui/core';
import {
	patternValidatorFactory,
	requiredValidatorFactory,
} from '@mocker/shared/utils';
import {GraphQLFacade, GraphQLMockDto} from '@mocker/graphql/domain';
import {BehaviorSubject} from 'rxjs';

const NAME_REQUIRED_ERROR = 'Укажите имя мока';
const NAME_FORMAT_ERROR = 'Некорректный формат имени';
const REQUEST_REQUIRED_ERROR = 'Укажите GrpahQL запрос';
const RESPONSE_REQUIRED_ERROR = 'Укажите JSON ответ';

const NAME_PATTERN = /^[a-zA-Z0-9_-]{3,255}$/;

@Component({
	selector: 'mocker-create-mock-dialog',
	templateUrl: './create-mock-dialog.component.html',
	styleUrls: ['./create-mock-dialog.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TuiDestroyService],
})
export class CreateMockDialogComponent implements OnInit {
	readonly form = this.formBuilder.group({
		name: [
			null,
			[
				requiredValidatorFactory(NAME_REQUIRED_ERROR),
				patternValidatorFactory(NAME_FORMAT_ERROR, NAME_PATTERN),
			],
		],
		expirationDate: [null],
		delay: [null],
		enable: [true],
	});

	readonly loading$ = this.facade.dialogLoading$;

	readonly requestError$ = new BehaviorSubject<TuiValidationError | null>(
		null
	);

	readonly responseError$ = new BehaviorSubject<TuiValidationError | null>(
		null
	);

	readonly requestCodeModel = {
		language: 'graphql',
		uri: 'request.graphql',
		value: '',
	};

	readonly responseCodeModel = {
		language: 'json',
		uri: 'response.json',
		value: '',
	};

	readonly minDateTime = [
		TuiDay.currentLocal().append({day: 1}),
		new TuiTime(0, 0),
	] as [TuiDay, TuiTime];

	readonly getEnablement = (enable?: boolean | null) =>
		enable ? 'включен' : 'выключен';

	constructor(
		@Inject(POLYMORPHEUS_CONTEXT)
		private readonly context: TuiDialogContext<void, string>,
		private readonly formBuilder: FormBuilder,
		private readonly facade: GraphQLFacade,
		private readonly destroy$: TuiDestroyService
	) {}

	get serviceId(): string {
		return this.context.data;
	}

	private get validateSchemas(): [string, string] | null {
		const request = this.requestCodeModel.value;
		const response = this.responseCodeModel.value;

		if (!request) {
			this.requestError$.next(
				new TuiValidationError(REQUEST_REQUIRED_ERROR)
			);
		} else {
			this.requestError$.next(null);
		}

		if (!response) {
			this.responseError$.next(
				new TuiValidationError(RESPONSE_REQUIRED_ERROR)
			);
		} else {
			this.responseError$.next(null);
		}

		if (!request || !response) {
			return null;
		}

		return [request, response];
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
		const schemas = this.validateSchemas;

		if (this.form.invalid || !schemas) {
			tuiMarkControlAsTouchedAndValidate(this.form);
			return;
		}

		const {
			name,
			expirationDate: dateTime,
			delay,
			enable,
		} = this.form.value as any;
		const [request, response] = schemas;

		const [date, time] = dateTime || [];

		let expirationDate;

		if (date) {
			expirationDate = date.toLocalNativeDate();

			if (time) {
				expirationDate.setHours(time.hours);
				expirationDate.setMinutes(time.minutes);
			}

			expirationDate = expirationDate.toISOString();
		}

		const mock: GraphQLMockDto = {
			name,
			expirationDate,
			delay,
			enable,
			request,
			response,
			serviceId: this.serviceId,
		};

		this.facade.createMock(mock);
	}
}
