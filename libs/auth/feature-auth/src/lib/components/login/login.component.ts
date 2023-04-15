import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
	selector: 'mocker-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
	readonly form = this.formBuilder.group({
		username: [null],
		password: [null],
	});

	constructor(private readonly formBuilder: FormBuilder) {}
}
