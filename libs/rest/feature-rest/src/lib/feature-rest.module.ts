import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {RestDomainModule} from '@mocker/rest/domain';
import {FeatureRestServiceListModule} from '@mocker/rest/feature-rest-service-list';
import {TuiSvgModule} from '@taiga-ui/core';

import {FeatureRestRoutingModule} from './feature-rest-routing.module';
import {FeatureRestComponent} from './feature-rest.component';

@NgModule({
	declarations: [FeatureRestComponent],
	imports: [
		CommonModule,
		FeatureRestRoutingModule,
		RouterModule,
		RestDomainModule,
		FeatureRestServiceListModule,
		TuiSvgModule,
	],
})
export class FeatureRestModule {}
