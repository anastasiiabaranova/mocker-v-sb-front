import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {LoginComponent, SignUpComponent} from './components';
import {AuthGuard, CanLoginGuard} from './guards';

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: 'login',
				canActivate: [CanLoginGuard],
				canDeactivate: [AuthGuard],
				component: LoginComponent,
			},
			{
				path: 'signup',
				canActivate: [CanLoginGuard],
				canDeactivate: [AuthGuard],
				component: SignUpComponent,
			},
		]),
	],
	providers: [AuthGuard, CanLoginGuard],
})
export class FeatureAuthRoutingModule {}
