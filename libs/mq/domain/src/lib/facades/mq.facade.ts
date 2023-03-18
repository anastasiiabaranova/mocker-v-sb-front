import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, ofType} from '@ngrx/effects';
import {fromMQ, mqActions} from '../store';
import {BrokerType} from '../enums';
import {Message, TopicMessage, TopicShort} from '../dtos';
import {MQApiService} from '../services';
import {Observable} from 'rxjs';

@Injectable()
export class MQFacade {
	readonly topics$ = this.store$.select(fromMQ.getTopics);

	readonly currentTopic$ = this.store$.select(fromMQ.getCurrentTopic);

	readonly topicCreated$ = this.actions$.pipe(ofType(mqActions.topicCreated));

	readonly messagesSent$ = this.actions$.pipe(ofType(mqActions.messagesSent));

	readonly dialogLoading$ = this.store$.select(fromMQ.getDialogLoading);

	constructor(
		private readonly store$: Store,
		private readonly actions$: Actions,
		private readonly apiService: MQApiService
	) {}

	loadTopics(brokerType: BrokerType, search?: string) {
		this.store$.dispatch(mqActions.loadTopics({brokerType, search}));
	}

	createTopic(topic: TopicShort) {
		this.store$.dispatch(mqActions.createTopic({topic}));
	}

	deleteTopic(brokerType: BrokerType, topicName: string) {
		this.store$.dispatch(mqActions.deleteTopic({brokerType, topicName}));
	}

	sendMessages(messages: TopicMessage) {
		this.store$.dispatch(mqActions.sendMessages({messages}));
	}

	readMessages(
		brokerType: BrokerType,
		topicName: string
	): Observable<ReadonlyArray<Message>> {
		return this.apiService.readMessages(brokerType, topicName);
	}
}
