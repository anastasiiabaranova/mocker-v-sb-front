import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {LoginComponent, SignUpComponent} from './components';

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: 'login',
				component: LoginComponent,
			},
			{
				path: 'signup',
				component: SignUpComponent,
			},
		]),
	],
})
export class FeatureAuthRoutingModule {}
