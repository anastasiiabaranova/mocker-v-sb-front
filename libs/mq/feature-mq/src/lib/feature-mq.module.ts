import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {TuiSvgModule} from '@taiga-ui/core';
import {MQDomainModule} from '@mocker/mq/domain';
import {FeatureMQTopicListModule} from '@mocker/mq/feature-mq-topic-list';

import {FeatureMQComponent} from './feature-mq.component';
import {FeatureMQRoutingModule} from './feature-mq-routing.module';

@NgModule({
	declarations: [FeatureMQComponent],
	imports: [
		CommonModule,
		FeatureMQRoutingModule,
		MQDomainModule,
		RouterModule,
		FeatureMQTopicListModule,
		TuiSvgModule,
	],
	exports: [FeatureMQComponent],
})
export class FeatureMQModule {}
