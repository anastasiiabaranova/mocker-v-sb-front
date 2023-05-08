import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {
	RestHistoryFacade,
	RestMethod,
	RestResponseSource,
} from '@mocker/rest/history/domain';
import {BehaviorSubject, map, shareReplay, tap} from 'rxjs';
import {startOfToday, subMonths, subWeeks} from 'date-fns';
import {TuiDay, TuiTime} from '@taiga-ui/cdk';
import {tuiFadeIn, tuiHeightCollapse} from '@taiga-ui/core';
import {ALLOWED_CODES} from '@mocker/shared/utils';

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

function tuiDateToTimestamp(
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

function stringifyResponseSource(responseSource: RestResponseSource): string {
	switch (responseSource) {
		case RestResponseSource.MockTemplate:
			return 'Шаблон';
		case RestResponseSource.ProxiedResponse:
			return 'Реальный сервис';
		case RestResponseSource.StaticResponse:
			return 'Статический ответ';
	}
}

@Component({
	selector: 'mocker-feature-rest-history',
	templateUrl: './feature-rest-history.component.html',
	styleUrls: ['./feature-rest-history.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [tuiHeightCollapse, tuiFadeIn],
})
export class FeatureRestHistoryComponent {
	readonly servicePath$ = this.facade.servicePath$;

	readonly form = this.formBuilder.group({
		range: [null],
		from: [null],
		to: [null],
		search: [null],
		statusCodes: [null],
		responseSources: [null],
		requestMethods: [null],
	});

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

	readonly showForm$ = new BehaviorSubject<boolean>(false);
	readonly filtered$ = new BehaviorSubject<boolean>(false);

	readonly rangeOptions = [
		RangeOption.Today,
		RangeOption.Week,
		RangeOption.Month,
		RangeOption.Custom,
	];

	readonly statusCodes = ALLOWED_CODES.map(code => `${code} `);

	readonly methods = [
		RestMethod.Get,
		RestMethod.Post,
		RestMethod.Put,
		RestMethod.Patch,
		RestMethod.Delete,
	];

	readonly responseSources = [
		RestResponseSource.MockTemplate,
		RestResponseSource.StaticResponse,
		RestResponseSource.ProxiedResponse,
	];

	readonly stringifySource = stringifyResponseSource;

	constructor(
		private readonly formBuilder: FormBuilder,
		private readonly facade: RestHistoryFacade
	) {}

	searchHistory() {
		const {from, to} = this.getTimeRange();
		const {search, responseSources, requestMethods} = this.form
			.value as any;

		const statusCodes = (this.form.value as any).statusCodes?.map(
			(code: string) => code.trim()
		);

		this.facade.searchHistory({
			from,
			to,
			search,
			statusCodes,
			responseSources,
			requestMethods,
		});

		this.filtered$.next(this.filtered());
		this.showForm$.next(false);
	}

	resetFilters() {
		this.form.setValue({
			range: null,
			from: null,
			to: null,
			search: null,
			statusCodes: null,
			responseSources: null,
			requestMethods: null,
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
			from: tuiDateToTimestamp(fromDate, fromTime),
			to: tuiDateToTimestamp(toDate, toTime),
		};
	}

	private filtered(): boolean {
		const {
			range,
			from,
			to,
			search,
			statusCodes,
			responseSources,
			requestMethods,
		} = this.form.value;

		return (
			range !== null ||
			from !== null ||
			to !== null ||
			search !== null ||
			statusCodes !== null ||
			responseSources !== null ||
			requestMethods !== null
		);
	}
}
