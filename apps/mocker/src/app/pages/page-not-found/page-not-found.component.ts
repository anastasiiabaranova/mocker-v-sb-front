import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
	selector: 'mocker-page-not-found',
	templateUrl: './page-not-found.component.html',
	styleUrls: ['./page-not-found.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundComponent {}
