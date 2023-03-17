import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TuiButtonModule, TuiLoaderModule} from '@taiga-ui/core';
import {TuiLetModule} from '@taiga-ui/cdk';

import {ResponsesDialogComponent} from './responses-dialog.component';
import {CreateResponseDialogModule} from '../create-response-dialog/create-response-dialog.module';

@NgModule({
	declarations: [ResponsesDialogComponent],
	imports: [
		CommonModule,
		TuiButtonModule,
		TuiLetModule,
		CreateResponseDialogModule,
		TuiLoaderModule,
	],
	exports: [ResponsesDialogComponent],
})
export class ResponsesDialogModule {}
