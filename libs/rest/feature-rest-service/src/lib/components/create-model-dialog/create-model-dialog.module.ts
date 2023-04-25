import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {CodeEditorModule} from '@ngstack/code-editor';
import {
	TuiDataListWrapperModule,
	TuiFieldErrorPipeModule,
	TuiInputModule,
	TuiSelectModule,
} from '@taiga-ui/kit';
import {
	TuiButtonModule,
	TuiDataListModule,
	TuiErrorModule,
	TuiLoaderModule,
	TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {TuiMapperPipeModule} from '@taiga-ui/cdk';

import {CreateModelDialogComponent} from './create-model-dialog.component';

@NgModule({
	declarations: [CreateModelDialogComponent],
	imports: [
		CommonModule,
		CodeEditorModule.forChild(),
		ReactiveFormsModule,
		TuiInputModule,
		TuiTextfieldControllerModule,
		TuiButtonModule,
		TuiErrorModule,
		TuiFieldErrorPipeModule,
		TuiMapperPipeModule,
		TuiLoaderModule,
		TuiSelectModule,
		TuiDataListModule,
		TuiDataListWrapperModule,
	],
	exports: [CreateModelDialogComponent],
})
export class CreateModelDialogModule {}
