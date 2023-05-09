import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TuiButtonModule, TuiExpandModule} from '@taiga-ui/core';
import {TuiLetModule, TuiMapperPipeModule} from '@taiga-ui/cdk';
import {RestHistoryFullInfoComponent} from './rest-history-full-info.component';

@NgModule({
	declarations: [RestHistoryFullInfoComponent],
	imports: [
		CommonModule,
		TuiExpandModule,
		TuiMapperPipeModule,
		TuiButtonModule,
		TuiLetModule,
	],
	exports: [RestHistoryFullInfoComponent],
})
export class RestHistoryFullInfoModule {}
