import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: 'rest-api',
				loadChildren: () =>
					import('@mocker/rest/feature-rest').then(
						m => m.FeatureRestModule
					),
			},
		]),
	],
})
export class RestShellRoutingModule {}
