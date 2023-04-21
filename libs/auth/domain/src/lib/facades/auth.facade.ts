import {Injectable, OnDestroy} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {catchError, EMPTY, Observable, Subject, takeUntil, tap} from 'rxjs';
import {AuthDto, LoginResponseDto} from '../dtos';
import {AuthApiService, TokensStorageService} from '../services';
import {authActions, fromAuth} from '../store';

@Injectable()
export class AuthFacade implements OnDestroy {
	readonly email$ = this.store$.select(fromAuth.getEmail);

	readonly loading$ = this.store$.select(fromAuth.getLoading);

	readonly error$ = this.store$.select(fromAuth.getError);

	private readonly destroy$ = new Subject<void>();

	constructor(
		private readonly store$: Store,
		private readonly authApiService: AuthApiService,
		private readonly tokensStorageService: TokensStorageService,
		private readonly activatedRoute: ActivatedRoute,
		private readonly router: Router,
		private readonly location: Location
	) {}

	get tokensPresent(): boolean {
		return (
			!!this.tokensStorageService.accessToken &&
			!!this.tokensStorageService.refreshToken
		);
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	initialize() {
		const {refreshToken} = this.tokensStorageService;

		if (!refreshToken) {
			this.navigateToLogin();
			return;
		}

		this.refresh(refreshToken)
			.pipe(
				tap(() => this.navigateAfterRefresh()),
				catchError(() => {
					this.navigateToLogin();
					return EMPTY;
				}),
				takeUntil(this.destroy$)
			)
			.subscribe();
	}

	login(data: AuthDto) {
		this.store$.dispatch(authActions.login({data}));
	}

	signup(data: AuthDto) {
		this.store$.dispatch(authActions.signup({data}));
	}

	logout() {
		this.store$.dispatch(authActions.logout());
	}

	resetError() {
		this.store$.dispatch(authActions.resetError());
	}

	refresh(refreshToken: string): Observable<LoginResponseDto> {
		return this.authApiService.refresh({refreshToken}).pipe(
			tap(({accessToken, refreshToken, email}) => {
				this.tokensStorageService.accessToken = accessToken;
				this.tokensStorageService.refreshToken = refreshToken;
				this.store$.dispatch(authActions.loginSuccess({email}));
			})
		);
	}

	navigateToLogin() {
		const redirect = this.location.path();

		if (redirect.includes('/login') || redirect.includes('/signup')) {
			return;
		}

		this.router.navigate(['login'], {
			queryParams: {redirect},
		});
	}

	private navigateAfterRefresh() {
		const redirect =
			this.activatedRoute.snapshot.queryParams['redirect'] || '';

		this.router.navigate([redirect]);
	}
}
