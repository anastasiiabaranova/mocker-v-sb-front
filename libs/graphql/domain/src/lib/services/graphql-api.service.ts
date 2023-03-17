import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {
	GraphQLMockDto,
	GraphQLServiceDto,
	GraphQLServiceShortDto,
} from '../dtos';

@Injectable()
export class GraphQLApiService {
	constructor(private readonly httpClient: HttpClient) {}

	getAllServices(
		search?: string
	): Observable<ReadonlyArray<GraphQLServiceShortDto>> {
		return this.httpClient.get<ReadonlyArray<GraphQLServiceShortDto>>(
			'api/graphql/services',
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
		return this.httpClient.get<GraphQLServiceDto>(
			`api/graphql/services/${id}`
		);
	}

	createService(service: GraphQLServiceDto): Observable<string> {
		return this.httpClient
			.post<{id: string}>('api/graphql/services', service)
			.pipe(map(({id}) => id));
	}

	editService(service: GraphQLServiceDto): Observable<void> {
		return this.httpClient.put<void>(
			`api/graphql/services/${service.id}`,
			service
		);
	}

	deleteService(id: string): Observable<void> {
		return this.httpClient.delete<void>(`api/graphql/services/${id}`);
	}

	getAllMocks(id: string): Observable<ReadonlyArray<GraphQLMockDto>> {
		return this.httpClient.get<ReadonlyArray<GraphQLMockDto>>(
			`api/graphql/services/${id}/mocks`
		);
	}

	getMock(id: string): Observable<GraphQLMockDto> {
		return this.httpClient.get<GraphQLMockDto>(`graphql/mocks/${id}`);
	}

	createMock(mock: GraphQLMockDto): Observable<void> {
		return this.httpClient.post<void>('graphql/mocks', mock);
	}

	editMock(mock: GraphQLMockDto): Observable<void> {
		return this.httpClient.put<void>(`graphql/mocks/${mock.id}`, mock);
	}

	deleteMock(id: string): Observable<void> {
		return this.httpClient.delete<void>(`graphql/mocks/${id}`);
	}
}
