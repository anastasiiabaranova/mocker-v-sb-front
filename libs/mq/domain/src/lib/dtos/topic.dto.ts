import {BrokerType} from '../enums';

export type Topic = Readonly<{
	brokerType: BrokerType;
	host: string;
	port: number;
	topicName: string;
}>;
