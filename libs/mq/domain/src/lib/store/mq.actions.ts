import {createAction, props} from '@ngrx/store';
import {Topic, TopicMessage, TopicShort} from '../dtos';
import {BrokerType} from '../enums';

const loadTopics = createAction(
	'[MQ] Load Topics',
	props<{brokerType?: BrokerType; search?: string}>()
);
const setTopics = createAction(
	'[MQ] Set Services',
	props<{topics: ReadonlyArray<TopicShort> | null}>()
);
const setCurrentTopic = createAction(
	'[MQ] Set Current Topic',
	props<{topic: Topic}>()
);
const createTopic = createAction(
	'[MQ] Craete Topic',
	props<{topic: TopicShort}>()
);
const topicCreated = createAction(
	'[MQ] Topic Created',
	props<{topic: TopicShort}>()
);
const deleteTopic = createAction(
	'[MQ] Delete Topic',
	props<{brokerType: BrokerType; topicName: string}>()
);
const topicDeleted = createAction(
	'[MQ] Topic Deleted',
	props<{brokerType: BrokerType; topicName: string}>()
);
const sendMessages = createAction(
	'[MQ] Send Messages',
	props<{messages: TopicMessage}>()
);
const messagesSent = createAction('[MQ] Messages Sent');
const dialogRequestFailure = createAction('[MQ] Dialog Request Failure');

export const mqActions = {
	loadTopics,
	setTopics,
	setCurrentTopic,
	createTopic,
	topicCreated,
	deleteTopic,
	topicDeleted,
	sendMessages,
	messagesSent,
	dialogRequestFailure,
};
