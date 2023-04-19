import {Injectable} from '@angular/core';
import {RouterStateSnapshot} from '@angular/router';
import {AuthFacade} from '@mocker/auth/domain';
import {tuiIsPresent} from '@taiga-ui/cdk';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

function authRoute({url}: RouterStateSnapshot) {
	return url.includes('/login') || url.includes('/signup');
}

@Injectable()
export class AuthGuard {
	constructor(private readonly authFacade: AuthFacade) {}

	canDeactivate(
		_component: any,
		_currentRoute: any,
		_currentState: any,
		nextState: RouterStateSnapshot
	): Observable<boolean> {
		if (authRoute(nextState)) {
			return of(true);
		}

		return this.authFacade.email$.pipe(map(tuiIsPresent));
	}
}
