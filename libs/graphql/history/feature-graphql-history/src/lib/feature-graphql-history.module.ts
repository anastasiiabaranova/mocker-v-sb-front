import {NgModule} from '@angular/core';
import {GraphQLHistoryDomainModule} from '@mocker/graphql/history/domain';
import {FeatureGraphQLHistoryComponent} from './feature-graphql-history.component';
import {FeatureGraphQLHistoryRoutingModule} from './feature-graphql-history-routing.module';

@NgModule({
	declarations: [FeatureGraphQLHistoryComponent],
	imports: [FeatureGraphQLHistoryRoutingModule, GraphQLHistoryDomainModule],
	exports: [FeatureGraphQLHistoryComponent],
})
export class FeatureGraphQLHistoryModule {}
