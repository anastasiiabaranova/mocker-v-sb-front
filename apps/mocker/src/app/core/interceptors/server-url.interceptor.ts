import {
	HttpInterceptor,
	HttpRequest,
	HttpHandler,
	HttpEvent,
} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {AppConfig, ENVIRONMENT} from '@mocker/shared/utils';
import {Observable} from 'rxjs';

@Injectable()
export class ServerUrlInterceptor implements HttpInterceptor {
	constructor(@Inject(ENVIRONMENT) private readonly appConfig: AppConfig) {}

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const fullUrlRequest = request.clone({
			url: `${this.appConfig.serverUrl}/${request.url}`,
		});

		return next.handle(fullUrlRequest);
	}
}
