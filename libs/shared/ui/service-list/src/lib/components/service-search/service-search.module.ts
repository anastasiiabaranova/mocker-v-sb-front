import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {TuiButtonModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';

import {ServiceSearchComponent} from './service-search.component';

@NgModule({
	declarations: [ServiceSearchComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		TuiInputModule,
		TuiButtonModule,
		TuiTextfieldControllerModule,
	],
	exports: [ServiceSearchComponent],
})
export class ServiceSearchModule {}
