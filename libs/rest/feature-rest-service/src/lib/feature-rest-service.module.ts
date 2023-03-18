import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RestDomainModule} from '@mocker/rest/domain';
import {TuiLetModule, TuiMapperPipeModule} from '@taiga-ui/cdk';
import {TuiButtonModule} from '@taiga-ui/core';

import {FeatureRestServiceRoutingModule} from './feature-rest-service-routing.module';
import {FeatureRestServiceComponent} from './feature-rest-service.component';
import {
	RestMockListModule,
	RestModelListModule,
	CreateModelDialogModule,
	CreateMockDialogModule,
} from './components';

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
		CreateModelDialogModule,
		CreateMockDialogModule,
	],
	declarations: [FeatureRestServiceComponent],
})
export class FeatureRestServiceModule {}
