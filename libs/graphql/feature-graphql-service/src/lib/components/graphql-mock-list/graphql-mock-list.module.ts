import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TuiTableModule, TuiTablePaginationModule} from '@taiga-ui/addon-table';
import {TuiButtonModule, TuiExpandModule} from '@taiga-ui/core';
import {TuiLetModule, TuiMapperPipeModule} from '@taiga-ui/cdk';
import {TuiToggleModule} from '@taiga-ui/kit';

import {GraphQLMockListComponent} from './graphql-mock-list.component';
import {CreateMockDialogModule} from '../create-mock-dialog/create-mock-dialog.module';
import {GraphQLTriggersDialogModule} from '../graphql-triggers-dialog/graphql-triggers-dialog.module';

@NgModule({
	declarations: [GraphQLMockListComponent],
	imports: [
		CommonModule,
		FormsModule,
		TuiTableModule,
		TuiButtonModule,
		TuiTablePaginationModule,
		TuiMapperPipeModule,
		TuiToggleModule,
		TuiLetModule,
		TuiExpandModule,
		CreateMockDialogModule,
		GraphQLTriggersDialogModule,
	],
	exports: [GraphQLMockListComponent],
})
export class GraphQLMockListModule {}
