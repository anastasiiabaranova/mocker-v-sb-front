import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	OnInit,
	QueryList,
	ViewChildren,
} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthFacade} from '@mocker/auth/domain';
import {
	minLengthValidatorFactory,
	requiredValidatorFactory,
} from '@mocker/shared/utils';
import {
	TuiDestroyService,
	tuiIsPresent,
	tuiMarkControlAsTouchedAndValidate,
	TuiValidationError,
} from '@taiga-ui/cdk';
import {filter, takeUntil, tap, withLatestFrom} from 'rxjs';

const EMAIL_REQUIRED_ERROR = 'Введите Email';
const EMAIL_FORMAT_ERROR = 'Некорректный формат Email';
const PASSWORD_REQUIRED_ERROR = 'Введите пароль';
const PASSWORD_LENGTH_ERROR = 'Пароль должен содержать хотя бы 8 символов';
const REPEAT_PASSWORD_REQUIRED_ERROR = 'Введите пароль повторно';
const REPEAT_PASSWORD_MATCH_ERROR = 'Пароли не совпадают';

function passwordsMatchValidator(control: AbstractControl) {
	const data = control.parent?.getRawValue();

	return !!data && data.password !== data.repeatPassword
		? {match: new TuiValidationError(REPEAT_PASSWORD_MATCH_ERROR)}
		: null;
}

function emailValidator(control: AbstractControl) {
	return Validators.email(control)
		? {email: new TuiValidationError(EMAIL_FORMAT_ERROR)}
		: null;
}

@Component({
	selector: 'mocker-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TuiDestroyService],
})
export class SignUpComponent implements OnInit {
	@ViewChildren('password', {read: ElementRef})
	password!: QueryList<ElementRef>;

	@ViewChildren('confirmation', {read: ElementRef})
	confirmation!: QueryList<ElementRef>;

	readonly form = this.formBuilder.group({
		email: [
			null,
			[requiredValidatorFactory(EMAIL_REQUIRED_ERROR), emailValidator],
		],
		password: [
			null,
			[
				requiredValidatorFactory(PASSWORD_REQUIRED_ERROR),
				minLengthValidatorFactory(PASSWORD_LENGTH_ERROR, 8),
			],
		],
		repeatPassword: [
			null,
			[
				requiredValidatorFactory(REPEAT_PASSWORD_REQUIRED_ERROR),
				passwordsMatchValidator,
			],
		],
	});

	readonly email = this.form.controls.email;

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

	navigateToLogin() {
		const {queryParams} = this.activatedRoute.snapshot;

		this.router.navigate(['login'], {queryParams});
	}

	signup() {
		if (this.form.invalid) {
			tuiMarkControlAsTouchedAndValidate(this.form);
			return;
		}

		this.authFacade.signup(this.form.value as any);
	}

	goToPassword() {
		this.password.first.nativeElement.focus();
	}

	goToConfirmation() {
		this.confirmation.first.nativeElement.focus();
	}
}
