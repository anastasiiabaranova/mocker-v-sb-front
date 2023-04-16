import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: '',
				loadChildren: () =>
					import('@mocker/auth/feature-auth').then(
						m => m.FeatureAuthModule
					),
			},
		]),
	],
})
export class AuthShellRoutingModule {}
