import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {AuthFacade} from '@mocker/auth/api';

@Component({
	selector: 'mocker-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
	@Input() email!: string | null;

	readonly getUsername = (email: string) => email.split('@')[0];

	constructor(private readonly authFacade: AuthFacade) {}

	logout() {
		this.authFacade.logout();
	}
}
