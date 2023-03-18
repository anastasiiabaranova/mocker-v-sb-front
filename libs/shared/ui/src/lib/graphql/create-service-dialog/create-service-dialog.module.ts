import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {
	TuiCheckboxLabeledModule,
	TuiFieldErrorPipeModule,
	TuiInputDateTimeModule,
	TuiInputModule,
	TuiInputNumberModule,
} from '@taiga-ui/kit';
import {
	TuiButtonModule,
	TuiErrorModule,
	TuiHintModule,
	TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {CodeEditorModule} from '@ngstack/code-editor';

import {CreateServiceDialogComponent} from './create-service-dialog.component';

@NgModule({
	declarations: [CreateServiceDialogComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		CodeEditorModule.forChild(),
		TuiTextfieldControllerModule,
		TuiInputModule,
		TuiInputDateTimeModule,
		TuiButtonModule,
		TuiHintModule,
		TuiErrorModule,
		TuiFieldErrorPipeModule,
		TuiCheckboxLabeledModule,
		TuiInputNumberModule,
	],
	exports: [CreateServiceDialogComponent],
})
export class CreateServiceDialogModule {}
