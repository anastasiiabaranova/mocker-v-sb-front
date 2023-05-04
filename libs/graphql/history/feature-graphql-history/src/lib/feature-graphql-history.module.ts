import {NgModule} from '@angular/core';
import {FeatureGraphQLHistoryComponent} from './feature-graphql-history.component';
import {FeatureGraphQLHistoryRoutingModule} from './feature-graphql-history-routing.module';

@NgModule({
	declarations: [FeatureGraphQLHistoryComponent],
	imports: [FeatureGraphQLHistoryRoutingModule],
	exports: [FeatureGraphQLHistoryComponent],
})
export class FeatureGraphQLHistoryModule {}
