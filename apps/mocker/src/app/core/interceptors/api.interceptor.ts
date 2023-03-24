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
export class ApiInterceptor implements HttpInterceptor {
	constructor(@Inject(ENVIRONMENT) private readonly appConfig: AppConfig) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const address =
			req.url.split('/')[0] === 'graphql'
				? this.appConfig.graphqlUrl
				: this.appConfig.gatewayUrl;

		return next.handle(
			req.clone({
				url: `${address}/${req.url}`,
			})
		);
	}
}
