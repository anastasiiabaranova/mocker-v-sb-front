import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {GraphQLHistoryFacade} from '@mocker/graphql/history/domain';
import {map, shareReplay, tap} from 'rxjs';
import {startOfToday, subMonths, subWeeks} from 'date-fns';
import {requiredValidatorFactory} from '@mocker/shared/utils';
import {
	TuiDay,
	tuiMarkControlAsTouchedAndValidate,
	TuiTime,
} from '@taiga-ui/cdk';

type TimeRange = {from?: string; to?: string};

enum RangeOption {
	Today = 'Сегодня',
	Week = 'Неделя',
	Month = 'Месяц',
	Custom = 'Другой период',
}

function getToday(): string {
	return startOfToday().toISOString();
}

function getWeek(): string {
	return subWeeks(startOfToday(), 1).toISOString();
}

function getMonth(): string {
	return subMonths(startOfToday(), 1).toISOString();
}

function tuiDateToIsoString(
	date: TuiDay | null,
	time: TuiTime | null
): string | undefined {
	if (date) {
		const expirationTime = date.toLocalNativeDate();

		if (time) {
			expirationTime.setHours(time.hours);
			expirationTime.setMinutes(time.minutes);
		}

		return expirationTime.toISOString();
	}

	return undefined;
}

const REQUIRED_RANGE_ERROR = 'Укажите период';

@Component({
	selector: 'mocker-feature-graphql-history',
	templateUrl: './feature-graphql-history.component.html',
	styleUrls: ['./feature-graphql-history.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureGraphQLHistoryComponent {
	readonly serviceId$ = this.facade.serviceId$;

	readonly form = this.formBuilder.group({
		range: [null, requiredValidatorFactory(REQUIRED_RANGE_ERROR)],
		from: [null],
		to: [null],
	});

	readonly rangeOptions = [
		RangeOption.Today,
		RangeOption.Week,
		RangeOption.Month,
		RangeOption.Custom,
	];

	readonly showCustomRange$ = this.form.controls.range.valueChanges.pipe(
		map(value => value === RangeOption.Custom),
		tap(value => {
			if (!value) {
				this.form.patchValue({
					from: null,
					to: null,
				});
			}
		}),
		shareReplay(1)
	);

	constructor(
		private readonly formBuilder: FormBuilder,
		private readonly facade: GraphQLHistoryFacade
	) {}

	searchByDate() {
		if (this.form.invalid) {
			tuiMarkControlAsTouchedAndValidate(this.form);
			return;
		}

		const {from, to} = this.getTimeRange();

		this.facade.searchByDate(from, to);
	}

	private getTimeRange(): TimeRange {
		switch (this.form.value.range as any) {
			case RangeOption.Today:
				return {from: getToday()};
			case RangeOption.Week:
				return {from: getWeek()};
			case RangeOption.Month:
				return {from: getMonth()};
			case RangeOption.Custom:
			default:
				return this.getCustomTimeRange();
		}
	}

	private getCustomTimeRange(): TimeRange {
		const [fromDate, fromTime]: [TuiDay, TuiTime] =
			(this.form.controls.from.value as any) || [];
		const [toDate, toTime]: [TuiDay, TuiTime] =
			(this.form.controls.to.value as any) || [];

		return {
			from: tuiDateToIsoString(fromDate, fromTime),
			to: tuiDateToIsoString(toDate, toTime),
		};
	}
}
