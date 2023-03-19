import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {
	TuiFieldErrorPipeModule,
	TuiInputModule,
	TuiInputNumberModule,
	TuiSelectModule,
} from '@taiga-ui/kit';
import {
	TuiButtonModule,
	TuiErrorModule,
	TuiTextfieldControllerModule,
} from '@taiga-ui/core';

import {CreateTopicDialogComponent} from './create-topic-dialog.component';

@NgModule({
	declarations: [CreateTopicDialogComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		TuiTextfieldControllerModule,
		TuiInputModule,
		TuiButtonModule,
		TuiErrorModule,
		TuiFieldErrorPipeModule,
		TuiInputNumberModule,
		TuiSelectModule,
	],
	exports: [CreateTopicDialogComponent],
})
export class CreateTopicDialogModule {}
