import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {TuiTextfieldControllerModule} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';
import {TopicSearchComponent} from './topic-search.component';

@NgModule({
	declarations: [TopicSearchComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		TuiInputModule,
		TuiTextfieldControllerModule,
	],
	exports: [TopicSearchComponent],
})
export class TopicSearchModule {}
