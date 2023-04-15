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
import {LoginComponent} from './login.component';

@NgModule({
	declarations: [LoginComponent],
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
	exports: [LoginComponent],
})
export class LoginModule {}
