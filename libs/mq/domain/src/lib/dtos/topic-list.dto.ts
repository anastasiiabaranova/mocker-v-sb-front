import {TopicShort} from './topic-short.dto';

export type TopicList = Readonly<{
	queues: ReadonlyArray<TopicShort>;
}>;
