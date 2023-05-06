import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {RestHistoryFacade} from '@mocker/rest/history/domain';
import {map, shareReplay, tap} from 'rxjs';
import {startOfToday, subMonths, subWeeks} from 'date-fns';
import {TuiDay, TuiTime} from '@taiga-ui/cdk';

type TimeRange = {from?: number; to?: number};

enum RangeOption {
	Today = 'Сегодня',
	Week = 'Неделя',
	Month = 'Месяц',
	Custom = 'Другой период',
}

function getToday(): number {
	return startOfToday().getTime();
}

function getWeek(): number {
	return subWeeks(startOfToday(), 1).getTime();
}

function getMonth(): number {
	return subMonths(startOfToday(), 1).getTime();
}

function tuiDateToIsoString(
	date: TuiDay | null,
	time: TuiTime | null
): number | undefined {
	if (date) {
		const expirationTime = date.toLocalNativeDate();

		if (time) {
			expirationTime.setHours(time.hours);
			expirationTime.setMinutes(time.minutes);
			expirationTime.setSeconds(time.seconds);
		}

		return expirationTime.getTime();
	}

	return undefined;
}

@Component({
	selector: 'mocker-feature-rest-history',
	templateUrl: './feature-rest-history.component.html',
	styleUrls: ['./feature-rest-history.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureRestHistoryComponent {
	readonly servicePath$ = this.facade.servicePath$;

	readonly form = this.formBuilder.group({
		range: [null],
		from: [null],
		to: [null],
		search: [null],
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
		private readonly facade: RestHistoryFacade
	) {}

	searchHistory() {
		const {from, to} = this.getTimeRange();
		const {search} = this.form.value as any;

		this.facade.searchHistory({from, to, search});
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
