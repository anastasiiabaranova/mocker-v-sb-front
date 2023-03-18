import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TuiScrollbarModule} from '@taiga-ui/core';
import {ListHeaderModule} from '@mocker/shared/ui';
import {TuiLetModule} from '@taiga-ui/cdk';

import {ServiceCardModule} from './components';
import {FeatureGraphQLServiceListComponent} from './feature-graphql-service-list.component';

@NgModule({
	declarations: [FeatureGraphQLServiceListComponent],
	imports: [
		CommonModule,
		ServiceCardModule,
		TuiScrollbarModule,
		TuiLetModule,
		ListHeaderModule,
	],
	exports: [FeatureGraphQLServiceListComponent],
})
export class FeatureGraphQLServiceListModule {}
