import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, tap} from 'rxjs';
import {AuthDto, LoginResponseDto} from '../dtos';
import {AuthApiService, TokensStorageService} from '../services';
import {authActions, fromAuth} from '../store';

@Injectable()
export class AuthFacade {
	readonly email$ = this.store$.select(fromAuth.getEmail);

	readonly loading$ = this.store$.select(fromAuth.getLoading);

	readonly error$ = this.store$.select(fromAuth.getError);

	constructor(
		private readonly store$: Store,
		private readonly authApiService: AuthApiService,
		private readonly tokensStorageService: TokensStorageService
	) {}

	login(data: AuthDto) {
		this.store$.dispatch(authActions.login({data}));
	}

	signup(data: AuthDto) {
		this.store$.dispatch(authActions.signup({data}));
	}

	logout() {
		this.store$.dispatch(authActions.logout());
	}

	refresh(): Observable<LoginResponseDto> {
		const refreshToken = this.tokensStorageService.refreshToken!;

		return this.authApiService.refresh({refreshToken}).pipe(
			tap(({authenticationToken, refreshToken, email}) => {
				this.tokensStorageService.accessToken = authenticationToken;
				this.tokensStorageService.refreshToken = refreshToken;
				this.store$.dispatch(authActions.loginSuccess({email}));
			})
		);
	}
}
