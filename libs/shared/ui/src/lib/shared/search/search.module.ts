import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {TuiTextfieldControllerModule} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';
import {SearchComponent} from './search.component';

@NgModule({
	declarations: [SearchComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		TuiInputModule,
		TuiTextfieldControllerModule,
	],
	exports: [SearchComponent],
})
export class SearchModule {}
