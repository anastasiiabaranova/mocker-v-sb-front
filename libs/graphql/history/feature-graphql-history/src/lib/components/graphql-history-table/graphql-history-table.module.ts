import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TuiTableModule} from '@taiga-ui/addon-table';
import {TuiPaginationModule} from '@taiga-ui/kit';
import {TuiMapperPipeModule} from '@taiga-ui/cdk';
import {TuiScrollbarModule, TuiSvgModule} from '@taiga-ui/core';

import {GraphQLHistoryTableComponent} from './graphql-history-table.component';

@NgModule({
	declarations: [GraphQLHistoryTableComponent],
	imports: [
		CommonModule,
		TuiTableModule,
		TuiPaginationModule,
		TuiMapperPipeModule,
		TuiSvgModule,
		TuiScrollbarModule,
	],
	exports: [GraphQLHistoryTableComponent],
})
export class GraphQLHistoryTableModule {}
