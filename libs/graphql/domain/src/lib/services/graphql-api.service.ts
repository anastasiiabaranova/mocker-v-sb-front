import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';
import {
	GraphQLMockDto,
	GraphQLServiceDto,
	GraphQLServiceShortDto,
	TriggerDto,
} from '../dtos';

@Injectable()
export class GraphQLApiService {
	constructor(private readonly httpClient: HttpClient) {}

	getAllServices(
		search?: string
	): Observable<ReadonlyArray<GraphQLServiceShortDto>> {
		return this.httpClient.get<ReadonlyArray<GraphQLServiceShortDto>>(
			'graphql/services',
			{
				...(search && {
					params: new HttpParams({
						fromObject: {search},
					}),
				}),
			}
		);
	}

	getService(id: string): Observable<GraphQLServiceDto> {
		return this.httpClient.get<GraphQLServiceDto>(`graphql/services/${id}`);
	}

	createService(service: GraphQLServiceDto): Observable<string> {
		return this.httpClient
			.post<{id: string}>('graphql/services', service)
			.pipe(map(({id}) => id));
	}

	editService(service: GraphQLServiceDto): Observable<void> {
		return this.httpClient.put<void>(
			`graphql/services/${service.id}`,
			service
		);
	}

	switchHistory(id: string, enable: boolean): Observable<GraphQLServiceDto> {
		return this.httpClient.patch<GraphQLServiceDto>(
			`graphql/services/${id}/history`,
			{enable}
		);
	}

	deleteService(id: string): Observable<void> {
		return this.httpClient.delete<void>(`graphql/services/${id}`);
	}

	getAllMocks(id: string): Observable<ReadonlyArray<GraphQLMockDto>> {
		return this.httpClient.get<ReadonlyArray<GraphQLMockDto>>(
			`graphql/services/${id}/mocks`
		);
	}

	getMock(id: string): Observable<GraphQLMockDto> {
		return this.httpClient.get<GraphQLMockDto>(`graphql/mocks/${id}`);
	}

	createMock(mock: GraphQLMockDto): Observable<string> {
		return this.httpClient
			.post<{id: string}>('graphql/mocks', mock)
			.pipe(map(({id}) => id));
	}

	editMock(mock: GraphQLMockDto): Observable<void> {
		return this.httpClient.put<void>(`graphql/mocks/${mock.id}`, mock);
	}

	switchMock(mockId: string, enable: boolean): Observable<GraphQLMockDto> {
		return this.httpClient.patch<GraphQLMockDto>(
			`graphql/mocks/${mockId}`,
			{enable}
		);
	}

	deleteMock(id: string): Observable<void> {
		return this.httpClient.delete<void>(`graphql/mocks/${id}`);
	}

	deleteAllMocks(serviceId: string): Observable<void> {
		return this.httpClient.delete<void>(
			`graphql/services/${serviceId}/mocks`
		);
	}

	getAllTriggers(mockId: string): Observable<ReadonlyArray<TriggerDto>> {
		return this.httpClient.get<ReadonlyArray<TriggerDto>>(
			`graphql/mocks/${mockId}/triggers`
		);
	}

	getTrigger(triggerId: string): Observable<TriggerDto> {
		return this.httpClient.get<TriggerDto>(`graphql/triggers/${triggerId}`);
	}

	createTrigger(trigger: TriggerDto): Observable<void> {
		return this.httpClient.post<void>(`graphql/triggers`, trigger);
	}

	editTrigger(trigger: TriggerDto): Observable<TriggerDto> {
		return this.httpClient.put<TriggerDto>(
			`graphql/triggers/${trigger.id}`,
			trigger
		);
	}

	deleteTrigger(triggerId: string): Observable<void> {
		return this.httpClient.delete<void>(`graphql/triggers/${triggerId}`);
	}

	switchTrigger(triggerId: string, enable: boolean): Observable<void> {
		return this.httpClient.patch<void>(`graphql/triggers/${triggerId}`, {
			enable,
		});
	}

	verifyName(serviceName: string): Observable<boolean> {
		return this.httpClient
			.head<void>(`graphql/services/${serviceName}`)
			.pipe(
				map(() => false),
				catchError(() => of(true))
			);
	}
}
