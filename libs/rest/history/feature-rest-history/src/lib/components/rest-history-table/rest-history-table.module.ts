import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TuiTableModule, TuiTablePaginationModule} from '@taiga-ui/addon-table';
import {TuiLetModule, TuiMapperPipeModule} from '@taiga-ui/cdk';
import {
	TuiButtonModule,
	TuiExpandModule,
	TuiLoaderModule,
	TuiScrollbarModule,
	TuiSvgModule,
} from '@taiga-ui/core';

import {RestHistoryTableComponent} from './rest-history-table.component';
import {RestHistoryTableSkeletonModule} from '../rest-history-table-skeleton/rest-history-table-skeleton.module';

@NgModule({
	declarations: [RestHistoryTableComponent],
	imports: [
		CommonModule,
		TuiTableModule,
		TuiTablePaginationModule,
		TuiMapperPipeModule,
		TuiSvgModule,
		TuiScrollbarModule,
		TuiLetModule,
		TuiButtonModule,
		TuiExpandModule,
		TuiLoaderModule,
		RestHistoryTableSkeletonModule,
	],
	exports: [RestHistoryTableComponent],
})
export class RestHistoryTableModule {}
