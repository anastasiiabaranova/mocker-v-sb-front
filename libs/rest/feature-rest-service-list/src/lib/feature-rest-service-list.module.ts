import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TuiButtonModule, TuiScrollbarModule} from '@taiga-ui/core';

import {
	CreateServiceDialogModule,
	ServiceCardModule,
	ServiceSearchModule,
} from './components';
import {FeatureRestServiceListComponent} from './feature-rest-service-list.component';

@NgModule({
	declarations: [FeatureRestServiceListComponent],
	imports: [
		CommonModule,
		ServiceCardModule,
		ServiceSearchModule,
		TuiScrollbarModule,
		TuiButtonModule,
		CreateServiceDialogModule,
	],
	exports: [FeatureRestServiceListComponent],
})
export class FeatureRestServiceListModule {}
