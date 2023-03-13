import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FeatureGraphQLComponent} from './feature-graphql.component';
import {FeatureGraphQLRoutingModule} from './feature-graphql-routing.module';

@NgModule({
	imports: [FeatureGraphQLRoutingModule, RouterModule],
	declarations: [FeatureGraphQLComponent],
})
export class FeatureGraphQLModule {}
