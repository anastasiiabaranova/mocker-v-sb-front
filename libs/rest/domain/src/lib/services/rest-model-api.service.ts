import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {RestModelDto, RestModelListDto, RestModelShortDto} from '../dtos';

@Injectable()
export class RestModelApiService {
	constructor(private readonly httpClient: HttpClient) {}

	getAllModels(
		servicePath: string
	): Observable<ReadonlyArray<RestModelShortDto>> {
		return this.httpClient
			.get<RestModelListDto>(`rest/service/${servicePath}/models`)
			.pipe(map(({models}) => models));
	}

	getModel(servicePath: string, modelId: string): Observable<RestModelDto> {
		return this.httpClient.get<RestModelDto>(
			`rest/service/${servicePath}/model/${modelId}`
		);
	}

	createModel(servicePath: string, model: RestModelDto): Observable<void> {
		return this.httpClient.post<void>(
			`rest/service/${servicePath}/models`,
			model
		);
	}

	editModel(servicePath: string, model: RestModelDto): Observable<void> {
		return this.httpClient.put<void>(
			`rest/service/${servicePath}/model/${model.modelId}`,
			model
		);
	}

	deleteModel(servicePath: string, modelId: string): Observable<void> {
		return this.httpClient.delete<void>(
			`rest/service/${servicePath}/model/${modelId}`
		);
	}
}
