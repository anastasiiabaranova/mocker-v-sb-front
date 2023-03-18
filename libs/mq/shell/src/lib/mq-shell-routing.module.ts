import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: 'mq',
				loadChildren: () =>
					import('@mocker/mq/feature-mq').then(
						m => m.FeatureMQModule
					),
			},
		]),
	],
})
export class MQShellRoutingModule {}
