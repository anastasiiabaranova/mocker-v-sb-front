import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TuiButtonModule} from '@taiga-ui/core';
import {TuiTableModule} from '@taiga-ui/addon-table';
import {TuiMapperPipeModule} from '@taiga-ui/cdk';

import {FeatureGraphqlServiceComponent} from './feature-graphql-service.component';
import {FeatureRestServiceRoutingModule} from './feature-graphql-service-routing.module';

@NgModule({
	imports: [
		FeatureRestServiceRoutingModule,
		CommonModule,
		TuiButtonModule,
		TuiTableModule,
		TuiMapperPipeModule,
	],
	declarations: [FeatureGraphqlServiceComponent],
})
export class FeatureGraphQLServiceModule {}
