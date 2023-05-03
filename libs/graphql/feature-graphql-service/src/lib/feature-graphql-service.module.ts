import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {TuiButtonModule} from '@taiga-ui/core';
import {TuiTableModule} from '@taiga-ui/addon-table';
import {TuiLetModule, TuiMapperPipeModule} from '@taiga-ui/cdk';

import {FeatureGraphQLServiceComponent} from './feature-graphql-service.component';
import {FeatureGraphQLServiceRoutingModule} from './feature-graphql-service-routing.module';
import {GraphQLMockListModule} from './components';

@NgModule({
	imports: [
		FeatureGraphQLServiceRoutingModule,
		CommonModule,
		RouterModule,
		TuiButtonModule,
		TuiTableModule,
		TuiMapperPipeModule,
		TuiLetModule,
		GraphQLMockListModule,
	],
	declarations: [FeatureGraphQLServiceComponent],
})
export class FeatureGraphQLServiceModule {}
