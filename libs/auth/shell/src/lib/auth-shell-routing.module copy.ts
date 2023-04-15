import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SignInComponent, SignUpComponent} from '@mocker/auth/feature-auth';

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: 'signin',
				component: SignInComponent,
			},
			{
				path: 'signup',
				component: SignUpComponent,
			},
		]),
	],
})
export class AuthShellRoutingModule {}
