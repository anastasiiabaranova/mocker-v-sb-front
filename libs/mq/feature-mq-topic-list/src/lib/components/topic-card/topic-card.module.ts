import {NgModule} from '@angular/core';
import {TuiBadgeModule} from '@taiga-ui/kit';
import {TopicCardComponent} from './topic-card.component';

@NgModule({
	declarations: [TopicCardComponent],
	imports: [TuiBadgeModule],
	exports: [TopicCardComponent],
})
export class TopicCardModule {}
