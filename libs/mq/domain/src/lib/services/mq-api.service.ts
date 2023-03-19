import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';
import {
	Message,
	MessageList,
	Topic,
	TopicList,
	TopicMessage,
	TopicShort,
} from '../dtos';
import {BrokerType} from '../enums';

@Injectable()
export class MQApiService {
	constructor(private readonly httpClient: HttpClient) {}

	getAllTopics(
		brokerType?: BrokerType,
		search?: string
	): Observable<ReadonlyArray<TopicShort>> {
		return this.httpClient
			.get<TopicList>('api/mq/topics', {
				params: new HttpParams({
					fromObject: {
						...(brokerType && {brokerType}),
						...(search && {search}),
					},
				}),
			})
			.pipe(
				map(({queues}) => queues),
				catchError(() =>
					of([
						{
							brokerType: BrokerType.Kafka,
							topicName: 'topic 1',
						},
						{
							brokerType: BrokerType.Kafka,
							topicName: 'topic 2',
						},
						{
							brokerType: BrokerType.Kafka,
							topicName: 'topic 3',
						},
						{
							brokerType: BrokerType.Kafka,
							topicName: 'topic 4',
						},
					])
				)
			);
	}

	getTopic(brokerType: BrokerType, topicName: string): Observable<Topic> {
		return this.httpClient.get<Topic>('api/mq/topic', {
			params: new HttpParams({
				fromObject: {brokerType, topicName},
			}),
		});
	}

	createTopic(topic: TopicShort): Observable<Topic> {
		return this.httpClient.post<Topic>('api/mq/topic', topic);
	}

	deleteTopic(brokerType: BrokerType, topicName: string): Observable<void> {
		return this.httpClient.delete<void>('api/mq/topic', {
			params: new HttpParams({
				fromObject: {brokerType, topicName},
			}),
		});
	}

	sendMessages(messages: TopicMessage): Observable<void> {
		return this.httpClient.post<void>('api/mq/messages', messages);
	}

	readMessages(
		brokerType: BrokerType,
		topicName: string
	): Observable<ReadonlyArray<Message>> {
		return this.httpClient
			.get<MessageList>('api/mq/messages', {
				params: new HttpParams({
					fromObject: {brokerType, topicName},
				}),
			})
			.pipe(map(({messages}) => messages));
	}
}
