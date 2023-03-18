import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {
	TuiFieldErrorPipeModule,
	TuiInputDateTimeModule,
	TuiInputModule,
	TuiInputNumberModule,
	TuiToggleModule,
} from '@taiga-ui/kit';
import {
	TuiButtonModule,
	TuiErrorModule,
	TuiHintModule,
	TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {TuiLetModule, TuiMapperPipeModule} from '@taiga-ui/cdk';
import {CodeEditorModule} from '@ngstack/code-editor';

import {CreateMockDialogComponent} from './create-mock-dialog.component';

@NgModule({
	declarations: [CreateMockDialogComponent],
	imports: [
		CommonModule,
		CodeEditorModule.forChild(),
		ReactiveFormsModule,
		TuiTextfieldControllerModule,
		TuiInputModule,
		TuiErrorModule,
		TuiFieldErrorPipeModule,
		TuiMapperPipeModule,
		TuiLetModule,
		TuiButtonModule,
		TuiInputNumberModule,
		TuiInputDateTimeModule,
		TuiHintModule,
		TuiToggleModule,
	],
	exports: [CreateMockDialogComponent],
})
export class CreateMockDialogModule {}
