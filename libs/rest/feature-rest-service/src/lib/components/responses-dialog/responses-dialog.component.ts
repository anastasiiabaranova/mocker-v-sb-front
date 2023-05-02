import {
	ChangeDetectionStrategy,
	Component,
	Inject,
	Injector,
} from '@angular/core';
import {Clipboard} from '@angular/cdk/clipboard';
import {
	RestFacade,
	RestMockApiService,
	RestResponseApiService,
	RestResponseDto,
} from '@mocker/rest/domain';
import {
	AppConfig,
	ENVIRONMENT,
	NotificationsFacade,
} from '@mocker/shared/utils';
import {TuiDestroyService, tuiIsPresent} from '@taiga-ui/cdk';
import {
	TuiDialogContext,
	TuiDialogService,
	TuiNotification,
} from '@taiga-ui/core';
import {
	POLYMORPHEUS_CONTEXT,
	PolymorpheusComponent,
} from '@tinkoff/ng-polymorpheus';
import {
	BehaviorSubject,
	catchError,
	combineLatest,
	EMPTY,
	filter,
	Observable,
	of,
	switchMap,
	takeUntil,
} from 'rxjs';
import {CreateResponseDialogComponent} from '../create-response-dialog/create-response-dialog.component';

@Component({
	selector: 'mocker-responses-dialog',
	templateUrl: './responses-dialog.component.html',
	styleUrls: ['./responses-dialog.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TuiDestroyService],
})
export class ResponsesDialogComponent {
	readonly servicePath$ = this.facade.servicePath$.pipe(filter(tuiIsPresent));

	readonly loadResponses$ = new BehaviorSubject<void>(void 0);

	readonly responses$ = this.loadResponses$.pipe(
		switchMap(() => this.servicePath$),
		switchMap(path =>
			this.responseApiService.getAllResponses(path, this.mockId).pipe(
				catchError(() => {
					this.notificationsFacade.showNotification({
						label: 'Не удалось загрузить статические ответы',
						content: 'Попробуйте еще раз позже',
						status: TuiNotification.Error,
					});

					return of([]);
				})
			)
		)
	);

	readonly mock$ = this.servicePath$.pipe(
		switchMap(path =>
			this.mockApiService.getMock(path, this.mockId).pipe(
				catchError(() => {
					this.notificationsFacade.showNotification({
						label: 'Не удалось загрузить шаблон мока',
						content: 'Попробуйте еще раз позже',
						status: TuiNotification.Error,
					});

					return EMPTY;
				})
			)
		)
	);

	dialogShown = false;

	constructor(
		@Inject(ENVIRONMENT) private readonly appConfig: AppConfig,
		@Inject(POLYMORPHEUS_CONTEXT)
		private readonly context: TuiDialogContext<void, string>,
		private readonly facade: RestFacade,
		private readonly destroy$: TuiDestroyService,
		private readonly notificationsFacade: NotificationsFacade,
		private readonly dialogService: TuiDialogService,
		private readonly responseApiService: RestResponseApiService,
		private readonly mockApiService: RestMockApiService,
		private readonly injector: Injector,
		private readonly clipboard: Clipboard
	) {}

	get mockId(): string {
		return this.context.data;
	}

	copyResponseUrlToClipboard(servicePath: string, responsePath: string) {
		const url = `${this.appConfig.gatewayUrl}/rest/${servicePath}/${responsePath}`;

		if (this.clipboard.copy(url)) {
			this.notificationsFacade.showNotification({
				content: 'URL статического ответа скопирован в буфер обмена',
				status: TuiNotification.Success,
			});
		}
	}

	closeDialog() {
		this.context.completeWith();
	}

	createResponse(servicePath: string) {
		if (this.dialogShown) {
			return;
		}
		this.dialogShown = true;

		this.mock$
			.pipe(
				switchMap(mock =>
					this.dialogService.open<boolean>(
						new PolymorpheusComponent(
							CreateResponseDialogComponent,
							this.injector
						),
						{
							data: {
								mock,
								servicePath,
							},
							size: 'l',
							closeable: false,
							dismissible: false,
						}
					)
				),
				takeUntil(this.destroy$)
			)
			.subscribe({
				next: update => {
					this.dialogShown = false;
					if (update) {
						this.loadResponses$.next();
					}
				},
			});
	}

	editResponse(servicePath: string, responseId: string) {
		if (this.dialogShown) {
			return;
		}
		this.dialogShown = true;

		combineLatest([this.mock$, this.getResponse(servicePath, responseId)])
			.pipe(
				switchMap(([mock, response]) =>
					this.dialogService.open<boolean>(
						new PolymorpheusComponent(
							CreateResponseDialogComponent,
							this.injector
						),
						{
							data: {
								mock,
								servicePath,
								response,
							},
							size: 'l',
							closeable: false,
							dismissible: false,
						}
					)
				),
				takeUntil(this.destroy$)
			)
			.subscribe({
				next: update => {
					this.dialogShown = false;
					if (update) {
						this.loadResponses$.next();
					}
				},
			});
	}

	deleteResponse(servicePath: string, responseId: string) {
		this.responseApiService
			.deleteResponse(servicePath, this.mockId, responseId)
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: () => this.loadResponses$.next(),
				error: () => {
					this.notificationsFacade.showNotification({
						label: 'Не удалось удалить статический ответ',
						content: 'Попробуйте еще раз позже',
						status: TuiNotification.Error,
					});
				},
			});
	}

	private getResponse(
		servicePath: string,
		responseId: string
	): Observable<RestResponseDto> {
		return this.responseApiService
			.getResponse(servicePath, this.mockId, responseId)
			.pipe(
				catchError(() => {
					this.notificationsFacade.showNotification({
						label: 'Не удалось загрузить статический ответ',
						content: 'Попробуйте еще раз позже',
						status: TuiNotification.Error,
					});

					return EMPTY;
				})
			);
	}
}
