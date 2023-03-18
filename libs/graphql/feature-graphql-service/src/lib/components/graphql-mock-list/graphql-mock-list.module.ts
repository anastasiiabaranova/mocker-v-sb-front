import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TuiTableModule, TuiTablePaginationModule} from '@taiga-ui/addon-table';
import {TuiButtonModule} from '@taiga-ui/core';
import {TuiMapperPipeModule} from '@taiga-ui/cdk';
import {TuiToggleModule} from '@taiga-ui/kit';

import {GraphQLMockListComponent} from './graphql-mock-list.component';
import {CreateMockDialogModule} from '../create-mock-dialog/create-mock-dialog.module';

@NgModule({
	declarations: [GraphQLMockListComponent],
	imports: [
		CommonModule,
		FormsModule,
		TuiTableModule,
		TuiButtonModule,
		TuiTablePaginationModule,
		TuiMapperPipeModule,
		CreateMockDialogModule,
		TuiToggleModule,
	],
	exports: [GraphQLMockListComponent],
})
export class GraphQLMockListModule {}
