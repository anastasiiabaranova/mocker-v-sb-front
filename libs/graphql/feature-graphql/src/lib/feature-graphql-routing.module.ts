import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FeatureGraphQLComponent} from './feature-graphql.component';

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: '',
				component: FeatureGraphQLComponent,
				children: [
					{
						path: ':id',
						loadChildren: () =>
							import(
								'@mocker/graphql/feature-graphql-service'
							).then(m => m.FeatureGraphQLServiceModule),
					},
				],
			},
		]),
	],
})
export class FeatureGraphQLRoutingModule {}
