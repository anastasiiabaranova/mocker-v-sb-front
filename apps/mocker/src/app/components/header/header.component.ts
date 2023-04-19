import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AuthFacade} from '@mocker/auth/domain';

@Component({
	selector: 'mocker-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
	readonly email$ = this.authFacade.email$;

	readonly getUsername = (email: string) => email.split('@')[0];

	constructor(private readonly authFacade: AuthFacade) {}

	logout() {
		this.authFacade.logout();
	}
}
