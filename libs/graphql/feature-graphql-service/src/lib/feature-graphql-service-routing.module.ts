import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FeatureGraphQLServiceComponent} from './feature-graphql-service.component';
@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: '',
				component: FeatureGraphQLServiceComponent,
				outlet: 'service',
			},
		]),
	],
})
export class FeatureGraphQLServiceRoutingModule {}
