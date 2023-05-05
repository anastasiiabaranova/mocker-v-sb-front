import {NgModule} from '@angular/core';
import {GraphQLHistoryDomainModule} from '@mocker/graphql/history/domain';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {
	TuiDataListWrapperModule,
	TuiFieldErrorPipeModule,
	TuiInputDateTimeModule,
	TuiSelectModule,
} from '@taiga-ui/kit';
import {
	TuiButtonModule,
	TuiDataListModule,
	TuiErrorModule,
	TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {CommonModule} from '@angular/common';

import {FeatureGraphQLHistoryComponent} from './feature-graphql-history.component';
import {FeatureGraphQLHistoryRoutingModule} from './feature-graphql-history-routing.module';
import {GraphQLHistoryTableModule} from './components';

@NgModule({
	declarations: [FeatureGraphQLHistoryComponent],
	imports: [
		CommonModule,
		RouterModule,
		FeatureGraphQLHistoryRoutingModule,
		GraphQLHistoryDomainModule,
		ReactiveFormsModule,
		TuiTextfieldControllerModule,
		TuiButtonModule,
		TuiInputDateTimeModule,
		TuiSelectModule,
		TuiDataListModule,
		TuiDataListWrapperModule,
		TuiErrorModule,
		TuiFieldErrorPipeModule,
		GraphQLHistoryTableModule,
	],
	exports: [FeatureGraphQLHistoryComponent],
})
export class FeatureGraphQLHistoryModule {}
