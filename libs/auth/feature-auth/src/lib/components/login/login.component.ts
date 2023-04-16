import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {requiredValidatorFactory} from '@mocker/shared/utils';
import {AuthFacade} from '@mocker/auth/domain';
import {tuiMarkControlAsTouchedAndValidate} from '@taiga-ui/cdk';

const EMAIL_REQUIRED_ERROR = 'Введите Email';
const PASSWORD_REQUIRED_ERROR = 'Введите пароль';

@Component({
	selector: 'mocker-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
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
		private readonly authFacade: AuthFacade
	) {}

	login() {
		if (this.form.invalid) {
			tuiMarkControlAsTouchedAndValidate(this.form);
			return;
		}

		this.authFacade.login(this.form.value as any);
	}
}
