import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';
import {RestServiceDto, RestServiceListDto, RestServiceShortDto} from '../dtos';

@Injectable()
export class RestServiceApiService {
	constructor(private readonly httpClient: HttpClient) {}

	getAllServices(): Observable<ReadonlyArray<RestServiceShortDto>> {
		return this.httpClient.get<RestServiceListDto>('rest/services').pipe(
			map(({services}) => services),
			catchError(() =>
				of([
					{
						name: 'Супер сервис 1',
						path: 'my-cool-service',
						totalMocks: 5,
						totalModels: 2,
						url: 'https://some.mocking/url',
					},
					{
						name: 'Еще один сервис',
						path: 'service/path',
						totalMocks: 5,
						totalModels: 2,
						url: 'https://mocking/url',
					},
				])
			)
		);
	}

	getService(servicePath: string): Observable<RestServiceDto> {
		return this.httpClient.get<RestServiceDto>(
			`rest/service/${servicePath}`
		);
	}

	createService(service: RestServiceDto): Observable<void> {
		return this.httpClient.post<void>('rest/service', service);
	}

	editService(service: RestServiceDto): Observable<void> {
		return this.httpClient.put<void>(
			`rest/service/${service.path}`,
			service
		);
	}

	deleteService(servicePath: string): Observable<void> {
		return this.httpClient.delete<void>(`rest/service/${servicePath}`);
	}
}