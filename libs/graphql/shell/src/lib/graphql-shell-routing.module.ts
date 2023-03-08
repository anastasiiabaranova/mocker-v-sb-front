import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: 'graphql',
				loadChildren: () =>
					import('@mocker/graphql/feature-graphql').then(
						m => m.FeatureGraphQLModule
					),
			},
		]),
	],
})
export class GraphqlShellRoutingModule {}
