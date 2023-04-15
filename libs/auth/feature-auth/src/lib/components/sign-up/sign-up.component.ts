import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
	selector: 'mocker-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
	readonly form = this.formBuilder.group({
		email: [null],
		password: [null],
		repeatPassword: [null],
	});

	constructor(private readonly formBuilder: FormBuilder) {}
}
