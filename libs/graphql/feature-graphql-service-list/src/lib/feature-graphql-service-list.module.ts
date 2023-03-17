import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TuiButtonModule, TuiScrollbarModule} from '@taiga-ui/core';
import {CreateServiceDialogModule} from '@mocker/shared/ui/graphql';

import {ServiceCardModule, ServiceSearchModule} from './components';
import {FeatureGraphQLServiceListComponent} from './feature-graphql-service-list.component';

@NgModule({
	declarations: [FeatureGraphQLServiceListComponent],
	imports: [
		CommonModule,
		ServiceCardModule,
		ServiceSearchModule,
		TuiScrollbarModule,
		TuiButtonModule,
		CreateServiceDialogModule,
	],
	exports: [FeatureGraphQLServiceListComponent],
})
export class FeatureGraphQLServiceListModule {}
