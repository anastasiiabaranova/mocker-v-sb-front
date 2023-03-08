import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FeatureRestServiceComponent} from './feature-rest-service.component';

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: '',
				component: FeatureRestServiceComponent,
				outlet: 'service',
			},
		]),
	],
})
export class FeatureRestServiceRoutingModule {}
