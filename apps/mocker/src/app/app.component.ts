import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AuthFacade} from '@mocker/auth/domain';

@Component({
	selector: 'mocker-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
	constructor(private readonly authFacade: AuthFacade) {}

	ngOnInit() {
		this.authFacade.initialize();
	}
}
