import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {
	TuiDataListWrapperModule,
	TuiFieldErrorPipeModule,
	TuiInputModule,
	TuiInputNumberModule,
	TuiSelectModule,
} from '@taiga-ui/kit';
import {
	TuiButtonModule,
	TuiDataListModule,
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
		TuiDataListWrapperModule,
		TuiDataListModule,
	],
	exports: [CreateTopicDialogComponent],
})
export class CreateTopicDialogModule {}
