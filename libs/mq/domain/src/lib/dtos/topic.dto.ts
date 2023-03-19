import {BrokerType} from '../enums';

export type Topic = Readonly<{
	brokerType: BrokerType;
	address: string;
	port: number;
	topicName: string;
	messageRetention?: number;
}>;
