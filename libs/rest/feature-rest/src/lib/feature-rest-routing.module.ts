import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FeatureRestComponent} from './feature-rest.component';

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: '',
				component: FeatureRestComponent,
				children: [
					{
						path: ':path',
						loadChildren: () =>
							import('@mocker/rest/feature-rest-service').then(
								m => m.FeatureRestServiceModule
							),
					},
				],
			},
		]),
	],
})
export class FeatureRestRoutingModule {}
