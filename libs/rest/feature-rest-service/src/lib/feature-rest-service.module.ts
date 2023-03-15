import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RestDomainModule} from '@mocker/rest/domain';
import {TuiLetModule, TuiMapperPipeModule} from '@taiga-ui/cdk';
import {TuiButtonModule} from '@taiga-ui/core';
import {CreateServiceDialogModule} from '@mocker/shared/ui/rest';

import {FeatureRestServiceRoutingModule} from './feature-rest-service-routing.module';
import {FeatureRestServiceComponent} from './feature-rest-service.component';
import {RestMockListModule, RestModelListModule} from './components';

@NgModule({
	imports: [
		FeatureRestServiceRoutingModule,
		RestDomainModule,
		CommonModule,
		TuiButtonModule,
		TuiMapperPipeModule,
		TuiLetModule,
		RestMockListModule,
		RestModelListModule,
		CreateServiceDialogModule,
	],
	declarations: [FeatureRestServiceComponent],
})
export class FeatureRestServiceModule {}
