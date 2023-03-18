import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TuiScrollbarModule} from '@taiga-ui/core';
import {TuiLetModule, TuiMapperPipeModule} from '@taiga-ui/cdk';
import {ListHeaderModule} from '@mocker/shared/ui';

import {TopicCardModule} from './components';
import {FeatureMqTopicListComponent} from './feature-mq-topic-list.component';

@NgModule({
	declarations: [FeatureMqTopicListComponent],
	imports: [
		CommonModule,
		TopicCardModule,
		TuiScrollbarModule,
		ListHeaderModule,
		TuiLetModule,
		TuiMapperPipeModule,
	],
	exports: [FeatureMqTopicListComponent],
})
export class FeatureMQTopicListModule {}
