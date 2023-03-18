import {NgModule} from '@angular/core';
import {TuiButtonModule} from '@taiga-ui/core';
import {ListHeaderComponent} from './list-header.component';
import {SearchModule} from '../search/search.module';

@NgModule({
	declarations: [ListHeaderComponent],
	imports: [SearchModule, TuiButtonModule],
	exports: [ListHeaderComponent],
})
export class ListHeaderModule {}
