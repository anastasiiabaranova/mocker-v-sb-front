import {
	HttpInterceptor,
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpErrorResponse,
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthFacade, TokensStorageService, UNAUTHORIZED} from '@mocker/auth/api';
import {NotificationsFacade} from '@mocker/shared/utils';
import {TuiNotification} from '@taiga-ui/core';
import {catchError, concatMap, EMPTY, Observable, throwError} from 'rxjs';

@Injectable()
export class AuthErrorInterceptor implements HttpInterceptor {
	constructor(
		private readonly router: Router,
		private readonly authFacade: AuthFacade,
		private readonly tokensStorageService: TokensStorageService,
		private readonly notificationsFacade: NotificationsFacade
	) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const skip = req.context.get(UNAUTHORIZED);

		return next.handle(req).pipe(
			catchError((error: HttpErrorResponse) => {
				if (!skip && error.status === 401) {
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

		return this.authFacade.refresh(refreshToken).pipe(
			concatMap(() => next.handle(req)),
			catchError((error: HttpErrorResponse) => {
				if (error.status === 401) {
					this.navigateToLogin();
					return EMPTY;
				}
				return throwError(() => error);
			})
		);
	}

	private navigateToLogin() {
		this.notificationsFacade.showNotification({
			status: TuiNotification.Error,
			content: 'Войдите в аккаунт, чтобы пользоваться сервисом',
		});
		this.tokensStorageService.clearTokens();
		this.router.navigate(['login'], {
			queryParams: {redirect: this.router.url},
		});
	}
}
