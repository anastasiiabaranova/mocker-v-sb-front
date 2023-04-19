import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {requiredValidatorFactory} from '@mocker/shared/utils';
import {AuthFacade} from '@mocker/auth/domain';
import {
	TuiDestroyService,
	tuiIsPresent,
	tuiMarkControlAsTouchedAndValidate,
} from '@taiga-ui/cdk';
import {filter, takeUntil, tap, withLatestFrom} from 'rxjs';

const EMAIL_REQUIRED_ERROR = 'Введите Email';
const PASSWORD_REQUIRED_ERROR = 'Введите пароль';

@Component({
	selector: 'mocker-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TuiDestroyService],
})
export class LoginComponent implements OnInit {
	readonly form = this.formBuilder.group({
		email: [null, requiredValidatorFactory(EMAIL_REQUIRED_ERROR)],
		password: [null, requiredValidatorFactory(PASSWORD_REQUIRED_ERROR)],
	});

	readonly email = this.form.controls.email;
	readonly password = this.form.controls.password;

	readonly loading$ = this.authFacade.loading$;
	readonly error$ = this.authFacade.error$;

	constructor(
		private readonly formBuilder: FormBuilder,
		private readonly authFacade: AuthFacade,
		private readonly activatedRoute: ActivatedRoute,
		private readonly router: Router,
		private readonly destroy$: TuiDestroyService
	) {}

	ngOnInit(): void {
		this.form.valueChanges
			.pipe(
				withLatestFrom(this.error$),
				filter(([, error]) => tuiIsPresent(error)),
				tap(() => this.authFacade.resetError()),
				takeUntil(this.destroy$)
			)
			.subscribe();
	}

	login() {
		if (this.form.invalid) {
			tuiMarkControlAsTouchedAndValidate(this.form);
			return;
		}

		this.authFacade.login(this.form.value as any);
	}

	navigateToSignUp() {
		const {queryParams} = this.activatedRoute.snapshot;

		this.router.navigate(['signup'], {queryParams});
	}
}
