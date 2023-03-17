import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TuiButtonModule} from '@taiga-ui/core';
import {TuiTableModule} from '@taiga-ui/addon-table';
import {TuiLetModule, TuiMapperPipeModule} from '@taiga-ui/cdk';

import {FeatureGraphqlServiceComponent} from './feature-graphql-service.component';
import {FeatureGraphQLServiceRoutingModule} from './feature-graphql-service-routing.module';

@NgModule({
	imports: [
		FeatureGraphQLServiceRoutingModule,
		CommonModule,
		TuiButtonModule,
		TuiTableModule,
		TuiMapperPipeModule,
		TuiLetModule,
	],
	declarations: [FeatureGraphqlServiceComponent],
})
export class FeatureGraphQLServiceModule {}
