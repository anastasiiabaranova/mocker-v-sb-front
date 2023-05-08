import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {RestHistoryDomainModule} from '@mocker/rest/history/domain';
import {TuiLetModule} from '@taiga-ui/cdk';
import {
	TuiButtonModule,
	TuiDataListModule,
	TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
	TuiBadgeModule,
	TuiDataListWrapperModule,
	TuiFilterByInputPipeModule,
	TuiInputDateTimeModule,
	TuiInputModule,
	TuiMultiSelectModule,
	TuiSelectModule,
	TuiStringifyContentPipeModule,
} from '@taiga-ui/kit';
import {RestHistoryTableModule} from './components';
import {FeatureRestHistoryRoutingModule} from './feature-rest-history-routing.module';
import {FeatureRestHistoryComponent} from './feature-rest-history.component';

@NgModule({
	declarations: [FeatureRestHistoryComponent],
	imports: [
		CommonModule,
		FeatureRestHistoryRoutingModule,
		RestHistoryDomainModule,
		ReactiveFormsModule,
		RouterModule,
		TuiButtonModule,
		TuiInputModule,
		TuiSelectModule,
		TuiDataListWrapperModule,
		TuiDataListModule,
		TuiInputDateTimeModule,
		TuiTextfieldControllerModule,
		TuiBadgeModule,
		TuiLetModule,
		TuiMultiSelectModule,
		TuiFilterByInputPipeModule,
		TuiStringifyContentPipeModule,
		RestHistoryTableModule,
	],
	exports: [FeatureRestHistoryComponent],
})
export class FeatureRestHistoryModule {}
