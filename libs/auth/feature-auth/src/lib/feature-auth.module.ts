import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthDomainModule} from '@mocker/auth/domain';
import {TuiLetModule} from '@taiga-ui/cdk';
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
import {FeatureAuthRoutingModule} from './feature-auth-routing.module';
import {LoginComponent} from './components';

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
		TuiLetModule,
		AuthDomainModule,
		FeatureAuthRoutingModule,
	],
	exports: [LoginComponent],
})
export class FeatureAuthModule {}
