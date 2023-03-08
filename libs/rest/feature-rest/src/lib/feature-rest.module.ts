import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ServiceListModule} from '@mocker/shared/ui/service-list';
import {FeatureRestRoutingModule} from './feature-rest-routing.module';
import {FeatureRestComponent} from './feature-rest.component';

@NgModule({
	declarations: [FeatureRestComponent],
	imports: [FeatureRestRoutingModule, RouterModule, ServiceListModule],
})
export class FeatureRestModule {}
