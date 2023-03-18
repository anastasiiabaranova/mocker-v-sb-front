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
import {EMPTY, of} from 'rxjs';
import {NotificationsFacade} from '@mocker/shared/utils';
import {TuiNotification} from '@taiga-ui/core';
import {Store} from '@ngrx/store';
import {ROUTER_NAVIGATED} from '@ngrx/router-store';
import {Router} from '@angular/router';

import {fromMQ} from './mq.selectors';
import {mqActions} from './mq.actions';
import {MQApiService} from '../services';
import {BrokerType} from '../enums';

@Injectable()
export class MQEffects {
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
		this.actions$.pipe(
			ofType(ROUTER_NAVIGATED),
			withLatestFrom(
				this.store$.select(fromMQ.getBrokerType),
				this.store$.select(fromMQ.getTopicName)
			),
			filter(([, brokerType, topicName]) => !!brokerType && !!topicName),
			switchMap(([, brokerType, topicName]) =>
				this.apiService
					.getTopic(brokerType! as BrokerType, topicName!)
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
					tap(() =>
						this.router.navigate(['mq', {queryParams: {topic}}])
					),
					map(() => mqActions.topicCreated({topic})),
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
