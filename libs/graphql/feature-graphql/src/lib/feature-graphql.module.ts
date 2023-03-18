import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {GraphQLDomainModule} from '@mocker/graphql/domain';
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
		GraphQLDomainModule,
		FeatureGraphQLServiceListModule,
		TuiSvgModule,
	],
	declarations: [FeatureGraphQLComponent],
})
export class FeatureGraphQLModule {}
