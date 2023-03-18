import {Topic, TopicShort} from '../dtos';

export interface MQState {
	topics?: ReadonlyArray<TopicShort> | null;
	currentTopic?: Topic | null;
	dialogLoading: boolean;
}
