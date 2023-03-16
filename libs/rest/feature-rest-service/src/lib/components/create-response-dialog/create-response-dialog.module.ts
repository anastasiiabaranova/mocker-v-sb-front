import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {CodeEditorModule} from '@ngstack/code-editor';
import {TuiMapperPipeModule, TuiLetModule} from '@taiga-ui/cdk';
import {
	TuiButtonModule,
	TuiErrorModule,
	TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
	TuiFieldErrorPipeModule,
	TuiInputModule,
	TuiInputNumberModule,
	TuiStepperModule,
} from '@taiga-ui/kit';

import {CreateResponseDialogComponent} from './create-response-dialog.component';

@NgModule({
	declarations: [CreateResponseDialogComponent],
	imports: [
		CommonModule,
		CodeEditorModule.forChild(),
		ReactiveFormsModule,
		TuiButtonModule,
		TuiErrorModule,
		TuiFieldErrorPipeModule,
		TuiInputModule,
		TuiInputNumberModule,
		TuiTextfieldControllerModule,
		TuiMapperPipeModule,
		TuiLetModule,
		TuiStepperModule,
	],
	exports: [CreateResponseDialogComponent],
})
export class CreateResponseDialogModule {}
