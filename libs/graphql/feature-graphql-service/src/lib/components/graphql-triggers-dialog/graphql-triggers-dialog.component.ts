import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {
	GraphQLApiService,
	GraphQLMockDto,
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
	of,
	startWith,
	switchMap,
	takeUntil,
	tap,
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
		switchMap(() => this.apiService.getAllTriggers(this.mockId))
	);

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
