import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
	selector: 'mocker-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
