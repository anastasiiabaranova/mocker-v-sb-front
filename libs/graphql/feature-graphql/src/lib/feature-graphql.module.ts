import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ServiceListModule} from '@mocker/shared/ui/service-list';
import {FeatureGraphQLComponent} from './feature-graphql.component';
import {FeatureGraphQLRoutingModule} from './feature-graphql-routing.module';

@NgModule({
	imports: [FeatureGraphQLRoutingModule, RouterModule, ServiceListModule],
	declarations: [FeatureGraphQLComponent],
})
export class FeatureGraphQLModule {}
