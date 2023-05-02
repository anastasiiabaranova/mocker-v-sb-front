import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {
	TuiButtonModule,
	TuiDataListModule,
	TuiErrorModule,
	TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
	TuiDataListWrapperModule,
	TuiFieldErrorPipeModule,
	TuiInputModule,
	TuiSelectModule,
	TuiStringifyContentPipeModule,
	TuiToggleModule,
} from '@taiga-ui/kit';
import {GraphqlTriggerFormComponent} from './graphql-trigger-form.component';

@NgModule({
	declarations: [GraphqlTriggerFormComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		TuiButtonModule,
		TuiInputModule,
		TuiSelectModule,
		TuiDataListModule,
		TuiDataListWrapperModule,
		TuiErrorModule,
		TuiFieldErrorPipeModule,
		TuiTextfieldControllerModule,
		TuiStringifyContentPipeModule,
		TuiToggleModule,
	],
	exports: [GraphqlTriggerFormComponent],
})
export class GraphqlTriggerFormModule {}
