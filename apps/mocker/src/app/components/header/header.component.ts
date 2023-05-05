import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Location} from '@angular/common';
import {AuthFacade} from '@mocker/auth/api';

function getActiveTabIndex(url: string): number {
	const start = url.split('/')[1];

	if (start === 'rest-api' || start === 'rest-api-history') {
		return 0;
	}

	if (start === 'graphql' || start === 'graphql-history') {
		return 1;
	}

	if (url === 'mq') {
		return 2;
	}

	return -1;
}

@Component({
	selector: 'mocker-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
	@Input() email!: string | null;

	activeTabIndex = getActiveTabIndex(this.location.path());

	readonly getUsername = (email: string) => email.split('@')[0];

	constructor(
		private readonly authFacade: AuthFacade,
		private readonly location: Location
	) {}

	logout() {
		this.authFacade.logout();
	}
}
