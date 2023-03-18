import {Action, createReducer, on} from '@ngrx/store';
import {MQState} from './mq.state';
import {mqActions} from './mq.actions';

const initialState: MQState = {
	dialogLoading: false,
};

const mqReducer = createReducer(
	initialState,
	on(mqActions.setTopics, (state, {topics}) => ({
		...state,
		topics,
	})),
	on(mqActions.setCurrentTopic, (state, {topic}) => ({
		...state,
		currentTopic: topic,
	})),
	on(mqActions.createTopic, state => ({
		...state,
		dialogLoading: true,
	})),
	on(mqActions.topicCreated, (state, {topic}) => ({
		...state,
		dialogLoading: false,
		topics: [topic, ...(state.topics || [])],
	})),
	on(mqActions.topicDeleted, (state, {brokerType, topicName}) => ({
		...state,
		topics: state.topics?.filter(
			topic =>
				topic.brokerType !== brokerType || topic.topicName !== topicName
		),
	})),
	on(mqActions.sendMessages, state => ({
		...state,
		dialogLoading: true,
	})),
	on(mqActions.messagesSent, state => ({
		...state,
		dialogLoading: false,
	})),
	on(mqActions.dialogRequestFailure, state => ({
		...state,
		dialogLoading: false,
	}))
);

export function reducer(state: MQState | undefined, action: Action) {
	return mqReducer(state, action);
}
