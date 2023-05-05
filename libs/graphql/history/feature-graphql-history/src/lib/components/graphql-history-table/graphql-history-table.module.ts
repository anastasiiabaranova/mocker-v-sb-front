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

import {GraphQLHistoryTableComponent} from './graphql-history-table.component';
import {GraphQLHistoryTableSkeletonModule} from '../graphql-history-table-skeleton/graphql-history-table-skeleton.module';

@NgModule({
	declarations: [GraphQLHistoryTableComponent],
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
		GraphQLHistoryTableSkeletonModule,
	],
	exports: [GraphQLHistoryTableComponent],
})
export class GraphQLHistoryTableModule {}
