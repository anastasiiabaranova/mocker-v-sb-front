import {BrokerType} from '../enums';

export type TopicMessage = Readonly<{
	brokerType: BrokerType;
	topicName: string;
	key: string;
	content: string;
	repeat: number;
}>;
