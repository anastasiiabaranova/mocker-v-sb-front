import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RestHistoryDto, RestHistoryParamsDto} from '../dtos';

@Injectable()
export class RestHistoryApiService {
	constructor(private readonly httpClient: HttpClient) {}

	getHistory(
		serviceId: string,
		params: RestHistoryParamsDto
	): Observable<RestHistoryDto> {
		return this.httpClient.get<RestHistoryDto>(
			`rest/service/${serviceId}/history`,
			{
				params: new HttpParams({
					fromObject: params,
				}),
			}
		);
	}
}
