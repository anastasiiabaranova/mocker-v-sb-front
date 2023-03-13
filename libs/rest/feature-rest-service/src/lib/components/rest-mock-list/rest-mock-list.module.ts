import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TuiTableModule, TuiTablePaginationModule} from '@taiga-ui/addon-table';
import {TuiButtonModule} from '@taiga-ui/core';

import {RestMockListComponent} from './rest-mock-list.component';

@NgModule({
	declarations: [RestMockListComponent],
	imports: [
		CommonModule,
		TuiTableModule,
		TuiButtonModule,
		TuiTablePaginationModule,
	],
	exports: [RestMockListComponent],
})
export class RestMockListModule {}
