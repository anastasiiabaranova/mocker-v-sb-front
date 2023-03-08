import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {RestMockDto, RestMockListDto, RestMockShortDto} from '../dtos';

@Injectable()
export class RestMockApiService {
	constructor(private readonly httpClient: HttpClient) {}

	getAllMocks(
		servicePath: string
	): Observable<ReadonlyArray<RestMockShortDto>> {
		return this.httpClient
			.get<RestMockListDto>(`rest/service/${servicePath}/mocks`)
			.pipe(map(({mocks}) => mocks));
	}

	getMock(servicePath: string, mockId: string): Observable<RestMockDto> {
		return this.httpClient.get<RestMockDto>(
			`rest/service/${servicePath}/mock/${mockId}`
		);
	}

	createMock(servicePath: string, mock: RestMockDto): Observable<void> {
		return this.httpClient.post<void>(
			`rest/service/${servicePath}/mock`,
			mock
		);
	}

	editMock(servicePath: string, mock: RestMockDto): Observable<void> {
		return this.httpClient.put<void>(
			`rest/service/${servicePath}/mock/${mock.mockId}`,
			mock
		);
	}

	deleteMock(servicePath: string, mockId: string): Observable<void> {
		return this.httpClient.delete<void>(
			`rest/service/${servicePath}/mock/${mockId}`
		);
	}
}
