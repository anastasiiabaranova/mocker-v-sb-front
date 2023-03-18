import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TuiScrollbarModule} from '@taiga-ui/core';
import {ListHeaderModule} from '@mocker/shared/ui';
import {TuiLetModule} from '@taiga-ui/cdk';

import {ServiceCardModule} from './components';
import {FeatureRestServiceListComponent} from './feature-rest-service-list.component';

@NgModule({
	declarations: [FeatureRestServiceListComponent],
	imports: [
		CommonModule,
		ServiceCardModule,
		TuiScrollbarModule,
		TuiLetModule,
		ListHeaderModule,
	],
	exports: [FeatureRestServiceListComponent],
})
export class FeatureRestServiceListModule {}
