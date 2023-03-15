import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {
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

import {CreateServiceDialogComponent} from './create-service-dialog.component';

@NgModule({
	declarations: [CreateServiceDialogComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		TuiTextfieldControllerModule,
		TuiInputModule,
		TuiTextAreaModule,
		TuiInputDateTimeModule,
		TuiButtonModule,
		TuiHintModule,
		TuiErrorModule,
		TuiFieldErrorPipeModule,
	],
	exports: [CreateServiceDialogComponent],
})
export class CreateServiceDialogModule {}
