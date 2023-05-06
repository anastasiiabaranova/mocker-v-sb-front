import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FeatureRestHistoryComponent} from './feature-rest-history.component';

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: ':id',
				component: FeatureRestHistoryComponent,
			},
		]),
	],
})
export class FeatureRestHistoryRoutingModule {}
