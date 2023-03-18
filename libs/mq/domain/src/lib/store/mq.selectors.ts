import {createFeatureSelector, createSelector} from '@ngrx/store';
import {getRouterSelectors, RouterReducerState} from '@ngrx/router-store';

import {MQ_FEATURE} from './mq-store.feature';
import {MQState} from './mq.state';

const routerFeature = createFeatureSelector<RouterReducerState>('router');

const {selectQueryParam} = getRouterSelectors(routerFeature);

const getBrokerType = selectQueryParam('brokerType');
const getTopicName = selectQueryParam('topicName');

const mqFeature = createFeatureSelector<MQState>(MQ_FEATURE);

const getTopics = createSelector(mqFeature, ({topics}) => topics);
const getCurrentTopic = createSelector(
	mqFeature,
	({currentTopic}) => currentTopic
);
const getDialogLoading = createSelector(
	mqFeature,
	({dialogLoading}) => dialogLoading
);

export const fromMQ = {
	getBrokerType,
	getTopicName,
	getTopics,
	getCurrentTopic,
	getDialogLoading,
};
