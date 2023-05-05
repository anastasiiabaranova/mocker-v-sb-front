import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {TuiButtonModule} from '@taiga-ui/core';
import {TuiTableModule} from '@taiga-ui/addon-table';
import {TuiLetModule, TuiMapperPipeModule} from '@taiga-ui/cdk';
import {TuiToggleModule} from '@taiga-ui/kit';

import {FeatureGraphQLServiceComponent} from './feature-graphql-service.component';
import {FeatureGraphQLServiceRoutingModule} from './feature-graphql-service-routing.module';
import {GraphQLMockListModule} from './components';

@NgModule({
	imports: [
		FeatureGraphQLServiceRoutingModule,
		CommonModule,
		ReactiveFormsModule,
		RouterModule,
		TuiButtonModule,
		TuiTableModule,
		TuiMapperPipeModule,
		TuiLetModule,
		TuiToggleModule,
		GraphQLMockListModule,
	],
	declarations: [FeatureGraphQLServiceComponent],
})
export class FeatureGraphQLServiceModule {}
