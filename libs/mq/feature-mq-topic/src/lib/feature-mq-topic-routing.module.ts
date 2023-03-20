import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FeatureMQTopicComponent} from './feature-mq-topic.component';

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: '',
				component: FeatureMQTopicComponent,
				outlet: 'topic',
			},
		]),
	],
})
export class FeatureMQTopicRoutingModule {}
