import {Injectable} from '@angular/core';
import {AuthFacade} from '@mocker/auth/domain';
import {tuiIsPresent} from '@taiga-ui/cdk';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class AuthGuard {
	constructor(private readonly authFacade: AuthFacade) {}

	canDeactivate(): Observable<boolean> {
		return this.authFacade.email$.pipe(map(tuiIsPresent));
	}
}
