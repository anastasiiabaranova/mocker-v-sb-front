import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {CodeEditorModule} from '@ngstack/code-editor';

import {CreateModelDialogComponent} from './create-model-dialog.component';
import {TuiFieldErrorPipeModule, TuiInputModule} from '@taiga-ui/kit';
import {
	TuiButtonModule,
	TuiErrorModule,
	TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {TuiMapperPipeModule} from '@taiga-ui/cdk';

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
	],
	exports: [CreateModelDialogComponent],
})
export class CreateModelDialogModule {}
