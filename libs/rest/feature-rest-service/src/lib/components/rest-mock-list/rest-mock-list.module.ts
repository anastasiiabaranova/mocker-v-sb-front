import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TuiTableModule, TuiTablePaginationModule} from '@taiga-ui/addon-table';
import {TuiButtonModule, TuiHintModule, TuiTooltipModule} from '@taiga-ui/core';
import {TuiTagModule} from '@taiga-ui/kit';
import {TuiMapperPipeModule} from '@taiga-ui/cdk';

import {RestMockListComponent} from './rest-mock-list.component';
import {ResponsesDialogModule} from '../responses-dialog/responses-dialog.module';

@NgModule({
	declarations: [RestMockListComponent],
	imports: [
		CommonModule,
		TuiTableModule,
		TuiButtonModule,
		TuiTablePaginationModule,
		TuiTooltipModule,
		TuiHintModule,
		TuiTagModule,
		TuiMapperPipeModule,
		ResponsesDialogModule,
	],
	exports: [RestMockListComponent],
})
export class RestMockListModule {}
