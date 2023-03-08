import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {
	RestResponseDto,
	RestResponseListDto,
	RestResponseShortDto,
} from '../dtos';

@Injectable()
export class RestResponseApiService {
	constructor(private readonly httpClient: HttpClient) {}

	getAllResponses(
		servicePath: string,
		mockId: string
	): Observable<ReadonlyArray<RestResponseShortDto>> {
		return this.httpClient
			.get<RestResponseListDto>(
				`rest/service/${servicePath}/mock/${mockId}/responses`
			)
			.pipe(map(({responses}) => responses));
	}

	getResponse(
		servicePath: string,
		mockId: string,
		responseId: string
	): Observable<RestResponseDto> {
		return this.httpClient.get<RestResponseDto>(
			`rest/service/${servicePath}/mock/${mockId}/response/${responseId}`
		);
	}

	createResponse(
		servicePath: string,
		mockId: string,
		response: RestResponseDto
	): Observable<void> {
		return this.httpClient.post<void>(
			`rest/service/${servicePath}/mock/${mockId}/response`,
			response
		);
	}

	editResponse(
		servicePath: string,
		mockId: string,
		response: RestResponseDto
	): Observable<void> {
		return this.httpClient.post<void>(
			`rest/service/${servicePath}/mock/${mockId}/response/${response.responseId}`,
			response
		);
	}

	deleteResponse(
		servicePath: string,
		mockId: string,
		responseId: string
	): Observable<void> {
		return this.httpClient.delete<void>(
			`rest/service/${servicePath}/mock/${mockId}/response/${responseId}`
		);
	}
}
