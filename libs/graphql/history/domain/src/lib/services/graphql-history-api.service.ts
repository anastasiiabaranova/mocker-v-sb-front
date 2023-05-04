import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GraphQLHistoryDto, GraphQLHistoryParamsDto} from '../dtos';

@Injectable()
export class GraphQLHistoryApiService {
	constructor(private readonly httpClient: HttpClient) {}

	getHistory(
		serviceId: string,
		params: GraphQLHistoryParamsDto
	): Observable<GraphQLHistoryDto> {
		return this.httpClient.get<GraphQLHistoryDto>(
			`graphql/services/${serviceId}/history`,
			{
				params: new HttpParams({
					fromObject: params,
				}),
			}
		);
	}
}
