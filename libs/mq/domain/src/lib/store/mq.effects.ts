import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
	map,
	catchError,
	switchMap,
	tap,
	withLatestFrom,
	filter,
} from 'rxjs/operators';
import {EMPTY, iif, of} from 'rxjs';
import {NotificationsFacade} from '@mocker/shared/utils';
import {TuiNotification} from '@taiga-ui/core';
import {Store} from '@ngrx/store';
import {ROUTER_NAVIGATED, ROUTER_REQUEST} from '@ngrx/router-store';
import {Router} from '@angular/router';

import {fromMQ} from './mq.selectors';
import {mqActions} from './mq.actions';
import {MQApiService} from '../services';
import {BrokerType} from '../enums';

@Injectable()
export class MQEffects {
	private readonly navigatedToMQ$ = this.actions$.pipe(
		ofType(ROUTER_NAVIGATED),
		map(({payload: {routerState}}) => routerState as any),
		map(({url}) => url),
		filter(url => url.split('/')[1] === 'mq')
	);

	private readonly navigatedFromMQ$ = this.actions$.pipe(
		ofType(ROUTER_REQUEST),
		map(({payload: {routerState, event}}: any) => [
			routerState.url,
			event.url,
		]),
		filter(
			([prevUrl, nextUrl]) =>
				prevUrl.split('/')[1] === 'mq' && nextUrl.split('/')[1] !== 'mq'
		)
	);

	resetState$ = createEffect(() =>
		this.navigatedFromMQ$.pipe(map(() => mqActions.resetState()))
	);

	loadTopics$ = createEffect(() =>
		this.actions$.pipe(
			ofType(mqActions.loadTopics),
			switchMap(({brokerType, search}) =>
				this.apiService.getAllTopics(brokerType, search).pipe(
					map(topics => mqActions.setTopics({topics})),
					catchError(() => {
						this.notificationsFacade.showNotification({
							label: 'Не удалось загрузить топики',
							content: 'Попробуйте еще раз позже',
							status: TuiNotification.Error,
						});
						return of(mqActions.setTopics({topics: null}));
					})
				)
			)
		)
	);

	openTopic$ = createEffect(() =>
		this.navigatedToMQ$.pipe(
			withLatestFrom(
				this.store$.select(fromMQ.getBrokerType),
				this.store$.select(fromMQ.getTopicName)
			),
			switchMap(([, brokerType, topicName]) =>
				iif(
					() => !!brokerType && !!topicName,
					this.apiService
						.getTopic(brokerType as BrokerType, topicName!)
						.pipe(
							map(topic => mqActions.setCurrentTopic({topic})),
							catchError(() => {
								this.notificationsFacade.showNotification({
									label: 'Не удалось открыть топик',
									content: 'Попробуйте еще раз позже',
									status: TuiNotification.Error,
								});
								return EMPTY;
							})
						),
					of(mqActions.setCurrentTopic({topic: null}))
				)
			)
		)
	);

	createTopic$ = createEffect(() =>
		this.actions$.pipe(
			ofType(mqActions.createTopic),
			switchMap(({topic}) =>
				this.apiService.createTopic(topic).pipe(
					tap(() =>
						this.notificationsFacade.showNotification({
							content: 'Топик успешно создан',
							status: TuiNotification.Success,
						})
					),
					tap(() => {
						this.router.navigate(['mq/topic'], {
							queryParams: {
								topicName: topic.topicName,
								brokerType: topic.brokerType,
							},
						});
					}),
					map(topic => mqActions.topicCreated({topic})),
					catchError(() => {
						this.notificationsFacade.showNotification({
							label: 'Не удалось создать топик',
							content: 'Попробуйте еще раз позже',
							status: TuiNotification.Error,
						});
						return of(mqActions.dialogRequestFailure());
					})
				)
			)
		)
	);

	deleteTopic$ = createEffect(() =>
		this.actions$.pipe(
			ofType(mqActions.deleteTopic),
			switchMap(({brokerType, topicName}) =>
				this.apiService.deleteTopic(brokerType, topicName).pipe(
					tap(() =>
						this.notificationsFacade.showNotification({
							content: 'Топик удален',
							status: TuiNotification.Success,
						})
					),
					tap(() => this.router.navigate(['mq'])),
					map(() => mqActions.topicDeleted({brokerType, topicName})),
					catchError(() => {
						this.notificationsFacade.showNotification({
							label: 'Не удалось удалить топик',
							content: 'Попробуйте еще раз позже',
							status: TuiNotification.Error,
						});
						return EMPTY;
					})
				)
			)
		)
	);

	sendMessages$ = createEffect(() =>
		this.actions$.pipe(
			ofType(mqActions.sendMessages),
			switchMap(({messages}) =>
				this.apiService.sendMessages(messages).pipe(
					tap(() =>
						this.notificationsFacade.showNotification({
							content: 'Сообщения отправлены',
							status: TuiNotification.Success,
						})
					),
					map(() => mqActions.messagesSent()),
					catchError(() => {
						this.notificationsFacade.showNotification({
							label: 'Не удалось отправить сообщения',
							content: 'Попробуйте еще раз позже',
							status: TuiNotification.Error,
						});
						return of(mqActions.dialogRequestFailure());
					})
				)
			)
		)
	);

	constructor(
		private readonly actions$: Actions,
		private readonly store$: Store,
		private readonly apiService: MQApiService,
		private readonly notificationsFacade: NotificationsFacade,
		private readonly router: Router
	) {}
}
