import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
	TuiButtonModule,
	TuiErrorModule,
	TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {ReactiveFormsModule} from '@angular/forms';
import {
	TuiFieldErrorPipeModule,
	TuiInputModule,
	TuiInputNumberModule,
	TuiTextAreaModule,
} from '@taiga-ui/kit';
import {MessageSendDialogComponent} from './message-send-dialog.component';

@NgModule({
	declarations: [MessageSendDialogComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		TuiInputModule,
		TuiInputNumberModule,
		TuiTextAreaModule,
		TuiButtonModule,
		TuiErrorModule,
		TuiFieldErrorPipeModule,
		TuiTextfieldControllerModule,
	],
	exports: [MessageSendDialogComponent],
})
export class MessageSendDialogModule {}
