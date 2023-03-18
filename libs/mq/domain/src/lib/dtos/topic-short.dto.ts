import {BrokerType} from '../enums';

export type TopicShort = Readonly<{
	brokerType: BrokerType;
	topicName: string;
}>;
