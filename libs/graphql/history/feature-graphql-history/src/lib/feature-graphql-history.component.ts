import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {GraphQLHistoryFacade} from '@mocker/graphql/history/domain';
import {BehaviorSubject, map, shareReplay, tap} from 'rxjs';
import {startOfToday, subMonths, subWeeks} from 'date-fns';
import {TuiDay, TuiTime, TUI_IS_MOBILE} from '@taiga-ui/cdk';
import {tuiFadeIn, tuiHeightCollapse} from '@taiga-ui/core';

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
		const result = date.toLocalNativeDate();

		if (time) {
			result.setHours(time.hours);
			result.setMinutes(time.minutes);
			result.setSeconds(time.seconds);
		}

		return result.toISOString();
	}

	return undefined;
}

@Component({
	selector: 'mocker-feature-graphql-history',
	templateUrl: './feature-graphql-history.component.html',
	styleUrls: ['./feature-graphql-history.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [tuiHeightCollapse, tuiFadeIn],
})
export class FeatureGraphQLHistoryComponent {
	readonly serviceId$ = this.facade.serviceId$;

	readonly showForm$ = new BehaviorSubject<boolean>(false);
	readonly filtered$ = new BehaviorSubject<boolean>(false);

	readonly form = this.formBuilder.group({
		range: [null],
		from: [null],
		to: [null],
		redirected: [null],
		isError: [null],
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
		@Inject(TUI_IS_MOBILE) readonly isMobile: boolean,
		private readonly formBuilder: FormBuilder,
		private readonly facade: GraphQLHistoryFacade
	) {}

	searchHistory() {
		const {from, to} = this.getTimeRange();
		const {redirected, isError} = this.form.value as any;

		this.facade.searchHistory({from, to, redirected, isError});

		this.filtered$.next(this.filtered());
		this.showForm$.next(false);
	}

	resetFilters() {
		this.form.setValue({
			range: null,
			from: null,
			to: null,
			redirected: null,
			isError: null,
		});
		this.searchHistory();
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

	private filtered(): boolean {
		const {range, from, to, redirected, isError} = this.form.value;

		return (
			range !== null ||
			from !== null ||
			to !== null ||
			redirected !== null ||
			isError !== null
		);
	}
}
