import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthFacade, TokensStorageService} from '@mocker/auth/domain';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Injectable()
export class CanLoginGuard implements CanActivate {
	constructor(
		private readonly authFacade: AuthFacade,
		private readonly tokensStorageService: TokensStorageService,
		private readonly router: Router
	) {}

	canActivate(): Observable<boolean> {
		return this.authFacade.email$.pipe(
			map(email => !email || !this.authFacade.tokensPresent),
			tap(notLoggedIn => {
				if (!notLoggedIn) {
					this.router.navigate(['']);
				}
			})
		);
	}
}
