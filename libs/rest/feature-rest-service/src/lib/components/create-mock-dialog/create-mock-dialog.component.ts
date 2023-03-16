import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
	selector: 'mocker-create-mock-dialog',
	templateUrl: './create-mock-dialog.component.html',
	styleUrls: ['./create-mock-dialog.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateMockDialogComponent {}
