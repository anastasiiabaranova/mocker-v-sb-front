import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {
	TuiButtonModule,
	TuiErrorModule,
	TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
	TuiFieldErrorPipeModule,
	TuiInputModule,
	TuiInputPasswordModule,
} from '@taiga-ui/kit';
import {SignInComponent} from './sign-in.component';

@NgModule({
	declarations: [SignInComponent],
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
	exports: [SignInComponent],
})
export class SignInModule {}
