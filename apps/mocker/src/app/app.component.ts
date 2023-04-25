import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {AuthFacade} from '@mocker/auth/api';
import {combineLatest, filter, map, shareReplay} from 'rxjs';

function authRoute(url: string) {
	return url.includes('/login') || url.includes('/signup');
}

@Component({
	selector: 'mocker-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
	readonly onAuthRoute$ = this.router.events.pipe(
		filter(event => event instanceof NavigationEnd),
		map(event => (event as NavigationEnd).url),
		map(authRoute),
		shareReplay(1)
	);

	readonly email$ = combineLatest([
		this.authFacade.email$,
		this.onAuthRoute$,
	]).pipe(
		map(([email, onAuthRoute]) => (!!email && !onAuthRoute ? email : null))
	);

	readonly showRouter$ = combineLatest([this.email$, this.onAuthRoute$]).pipe(
		map(([email, onAuthRoute]) => !!email || onAuthRoute)
	);

	constructor(
		private readonly authFacade: AuthFacade,
		private readonly router: Router
	) {}

	ngOnInit() {
		this.authFacade.initialize();
	}
}
