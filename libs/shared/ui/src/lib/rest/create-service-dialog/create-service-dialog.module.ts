import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {
	TuiCheckboxLabeledModule,
	TuiFieldErrorPipeModule,
	TuiInputDateTimeModule,
	TuiInputModule,
	TuiTextAreaModule,
} from '@taiga-ui/kit';
import {
	TuiButtonModule,
	TuiErrorModule,
	TuiHintModule,
	TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {TuiLetModule} from '@taiga-ui/cdk';

import {CreateServiceDialogComponent} from './create-service-dialog.component';

@NgModule({
	declarations: [CreateServiceDialogComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		TuiLetModule,
		TuiTextfieldControllerModule,
		TuiInputModule,
		TuiTextAreaModule,
		TuiInputDateTimeModule,
		TuiButtonModule,
		TuiHintModule,
		TuiErrorModule,
		TuiFieldErrorPipeModule,
		TuiCheckboxLabeledModule,
	],
	exports: [CreateServiceDialogComponent],
})
export class CreateServiceDialogModule {}
