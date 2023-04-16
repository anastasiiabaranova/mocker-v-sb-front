import {
	HttpInterceptor,
	HttpRequest,
	HttpHandler,
	HttpEvent,
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {TokensStorageService, UNAUTHORIZED} from '@mocker/auth/domain';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private readonly tokensStorageService: TokensStorageService) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		if (req.context.get(UNAUTHORIZED)) {
			return next.handle(req);
		}

		const accessToken = this.tokensStorageService.accessToken;
		const headers = req.headers.set(
			'Authorization',
			`Bearer ${accessToken}`
		);

		return next.handle(req.clone({headers}));
	}
}
