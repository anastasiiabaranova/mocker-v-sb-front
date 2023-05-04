import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FeatureGraphQLHistoryComponent} from './feature-graphql-history.component';

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: ':id',
				component: FeatureGraphQLHistoryComponent,
			},
		]),
	],
})
export class FeatureGraphQLHistoryRoutingModule {}
