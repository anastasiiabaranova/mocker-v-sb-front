import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FeatureMQComponent} from './feature-mq.component';

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: '',
				component: FeatureMQComponent,
				children: [
					{
						path: 'topic',
						loadChildren: () =>
							import(
								'@mocker/mq/feature-mq-topic'
							).then(m => m.FeatureMqTopicModule),
					},
				],
			},
		]),
	],
})
export class FeatureMQRoutingModule {}
