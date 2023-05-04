import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: 'graphql-history',
				loadChildren: () =>
					import(
						'@mocker/graphql/history/feature-graphql-history'
					).then(m => m.FeatureGraphQLHistoryModule),
			},
		]),
	],
})
export class GraphQLHistoryShellRoutingModule {}
