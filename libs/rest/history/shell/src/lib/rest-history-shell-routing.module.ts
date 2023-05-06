import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: 'rest-api-history',
				loadChildren: () =>
					import('@mocker/rest/history/feature-rest-history').then(
						m => m.FeatureRestHistoryModule
					),
			},
		]),
	],
})
export class RestHistoryShellRoutingModule {}
