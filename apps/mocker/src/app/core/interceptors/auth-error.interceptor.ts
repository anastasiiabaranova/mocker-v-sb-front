import {
	HttpInterceptor,
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpErrorResponse,
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthFacade, TokensStorageService} from '@mocker/auth/domain';
import {catchError, concatMap, EMPTY, Observable, throwError} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(
		private readonly router: Router,
		private readonly authFacade: AuthFacade,
		private readonly tokensStorageService: TokensStorageService
	) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			catchError((error: HttpErrorResponse) => {
				if (error.status === 401) {
					return this.refreshAndRetry(req, next);
				}
				return throwError(() => error);
			})
		);
	}

	private refreshAndRetry(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const refreshToken = this.tokensStorageService.refreshToken;

		if (!refreshToken) {
			this.navigateToLogin();
			return EMPTY;
		}

		return this.authFacade.refresh().pipe(
			concatMap(() => next.handle(req)),
			catchError(() => {
				this.navigateToLogin();
				return EMPTY;
			})
		);
	}

	private navigateToLogin() {
		this.router.navigate(['login'], {
			queryParams: {redirect: this.router.url},
		});
	}
}
