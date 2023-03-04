import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
	selector: 'mocker-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
