import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FeatureMQComponent} from './feature-mq.component';

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: '',
				component: FeatureMQComponent,
			},
		]),
	],
})
export class FeatureMQRoutingModule {}
