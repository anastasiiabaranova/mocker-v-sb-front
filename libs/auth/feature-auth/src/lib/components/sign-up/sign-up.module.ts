import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {
	TuiButtonModule,
	TuiErrorModule,
	TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
	TuiInputModule,
	TuiInputPasswordModule,
	TuiFieldErrorPipeModule,
} from '@taiga-ui/kit';
import {SignUpComponent} from './sign-up.component';

@NgModule({
	declarations: [SignUpComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		TuiInputModule,
		TuiInputPasswordModule,
		TuiButtonModule,
		TuiErrorModule,
		TuiTextfieldControllerModule,
		TuiFieldErrorPipeModule,
	],
	exports: [SignUpComponent],
})
export class SignUpModule {}
