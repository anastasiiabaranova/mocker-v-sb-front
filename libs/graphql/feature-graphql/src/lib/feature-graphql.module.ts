import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {GraphqlDomainModule} from '@mocker/graphql/domain';
import {CommonModule} from '@angular/common';
import {TuiSvgModule} from '@taiga-ui/core';
import {FeatureGraphQLServiceListModule} from '@mocker/graphql/feature-graphql-service-list';

import {FeatureGraphQLComponent} from './feature-graphql.component';
import {FeatureGraphQLRoutingModule} from './feature-graphql-routing.module';

@NgModule({
	imports: [
		CommonModule,
		FeatureGraphQLRoutingModule,
		RouterModule,
		GraphqlDomainModule,
		FeatureGraphQLServiceListModule,
		TuiSvgModule,
	],
	declarations: [FeatureGraphQLComponent],
})
export class FeatureGraphQLModule {}
