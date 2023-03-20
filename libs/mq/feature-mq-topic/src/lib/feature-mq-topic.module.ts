import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TuiLetModule, TuiMapperPipeModule} from '@taiga-ui/cdk';
import {TuiButtonModule} from '@taiga-ui/core';
import {MQTopicMessagesModule} from './components';

import {FeatureMQTopicRoutingModule} from './feature-mq-topic-routing.module';
import {FeatureMQTopicComponent} from './feature-mq-topic.component';

@NgModule({
	declarations: [FeatureMQTopicComponent],
	imports: [
		CommonModule,
		FeatureMQTopicRoutingModule,
		TuiMapperPipeModule,
		TuiLetModule,
		TuiButtonModule,
		MQTopicMessagesModule,
	],
})
export class FeatureMqTopicModule {}
