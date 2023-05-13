import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {
	GraphQLApiService,
	GraphQLMockDto,
	OperarionType,
	TriggerDto,
} from '@mocker/graphql/domain';
import {NotificationsFacade} from '@mocker/shared/utils';
import {TuiDestroyService, tuiPure} from '@taiga-ui/cdk';
import {TuiDialogContext, TuiNotification} from '@taiga-ui/core';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import {
	EMPTY,
	Subject,
	catchError,
	startWith,
	switchMap,
	takeUntil,
	tap,
	BehaviorSubject,
	of,
} from 'rxjs';

@Component({
	selector: 'mocker-graphql-triggers-dialog',
	templateUrl: './graphql-triggers-dialog.component.html',
	styleUrls: ['./graphql-triggers-dialog.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TuiDestroyService],
})
export class GraphQLTriggersDialogComponent {
	private readonly updateList$ = new Subject<void>();

	readonly triggers$ = this.updateList$.pipe(
		startWith(null),
		switchMap(() =>
			this.apiService
				.getAllTriggers(this.mockId)
				.pipe(catchError(() => of([])))
		)
	);

	readonly showTriggerForm$ = new BehaviorSubject<boolean>(false);

	readonly getDisplayedOperation = (operation: OperarionType) => {
		switch (operation) {
			case OperarionType.Equal:
				return '=';
			case OperarionType.Greater:
				return '>';
			case OperarionType.GreaterOrEqual:
				return '≥';
			case OperarionType.Less:
				return '<';
			case OperarionType.LessOrEqual:
				return '≤';
			case OperarionType.Regex:
				return 'Regex';
		}
	};

	constructor(
		@Inject(POLYMORPHEUS_CONTEXT)
		private readonly context: TuiDialogContext<void, GraphQLMockDto>,
		private readonly apiService: GraphQLApiService,
		private readonly notificationsFacade: NotificationsFacade,
		private readonly destroy$: TuiDestroyService
	) {}

	@tuiPure
	get mock(): GraphQLMockDto {
		return this.context.data;
	}

	@tuiPure
	get mockId(): string {
		return this.mock.id!;
	}

	closeDialog() {
		this.context.completeWith();
	}

	switchTriggerForm(show: boolean) {
		this.showTriggerForm$.next(show);
	}

	createTrigger(trigger: TriggerDto | null) {
		if (!trigger) {
			this.showTriggerForm$.next(false);
			return;
		}

		this.apiService
			.createTrigger(trigger)
			.pipe(
				tap(() => {
					this.showTriggerForm$.next(false);
					this.updateList$.next();
					this.showTriggerCreatedNotification();
				}),
				catchError(() => {
					this.showTriggerCreateErrorNotification();
					return EMPTY;
				}),
				takeUntil(this.destroy$)
			)
			.subscribe();
	}

	switchTrigger({id, enable}: TriggerDto) {
		this.apiService
			.switchTrigger(id!, !enable)
			.pipe(
				catchError(() => {
					this.showTriggerSwitchErrorNotification(enable);
					this.updateList$.next();
					return EMPTY;
				}),
				tap(() => this.updateList$.next()),
				takeUntil(this.destroy$)
			)
			.subscribe();
	}

	deleteTrigger({id}: TriggerDto) {
		this.apiService
			.deleteTrigger(id!)
			.pipe(
				tap(() => this.updateList$.next()),
				tap(() => this.showTriggerDeletedNotification()),
				catchError(() => {
					this.showTriggerDeleteErrorNotification();
					return EMPTY;
				}),
				takeUntil(this.destroy$)
			)
			.subscribe();
	}

	private showTriggerCreatedNotification() {
		this.notificationsFacade.showNotification({
			status: TuiNotification.Success,
			content: 'Триггер успешно создан',
		});
	}

	private showTriggerCreateErrorNotification() {
		this.notificationsFacade.showNotification({
			status: TuiNotification.Error,
			label: 'Не удалось создать триггер',
			content: 'Попробуйте еще раз позже',
		});
	}

	private showTriggerSwitchErrorNotification(enable: boolean) {
		this.notificationsFacade.showNotification({
			status: TuiNotification.Error,
			label: `Не удалось ${enable ? 'выключить' : 'включить'} триггер`,
			content: 'Попробуйте еще раз позже',
		});
	}

	private showTriggerDeletedNotification() {
		this.notificationsFacade.showNotification({
			status: TuiNotification.Success,
			content: 'Триггер удален',
		});
	}

	private showTriggerDeleteErrorNotification() {
		this.notificationsFacade.showNotification({
			status: TuiNotification.Error,
			label: 'Не удалось удалить триггер',
			content: 'Попробуйте еще раз позже',
		});
	}
}
