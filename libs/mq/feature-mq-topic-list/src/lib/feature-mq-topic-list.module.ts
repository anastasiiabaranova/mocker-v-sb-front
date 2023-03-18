import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TuiScrollbarModule, TuiButtonModule} from '@taiga-ui/core';
import {TuiLetModule, TuiMapperPipeModule} from '@taiga-ui/cdk';

import {TopicCardModule, TopicSearchModule} from './components';
import {FeatureMqTopicListComponent} from './feature-mq-topic-list.component';

@NgModule({
	declarations: [FeatureMqTopicListComponent],
	imports: [
		CommonModule,
		TopicCardModule,
		TopicSearchModule,
		TuiScrollbarModule,
		TuiButtonModule,
		TuiLetModule,
		TuiMapperPipeModule,
	],
	exports: [FeatureMqTopicListComponent],
})
export class FeatureMQTopicListModule {}
