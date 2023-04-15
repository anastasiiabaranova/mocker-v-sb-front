import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
	selector: 'mocker-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
	readonly form = this.formBuilder.group({
		username: [null],
		password: [null],
	});

	constructor(private readonly formBuilder: FormBuilder) {}
}
