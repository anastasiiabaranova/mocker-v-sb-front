import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FeatureGraphqlServiceComponent} from './feature-graphql-service.component';
@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: '',
				component: FeatureGraphqlServiceComponent,
				outlet: 'service',
			},
		]),
	],
})
export class FeatureRestServiceRoutingModule {}
