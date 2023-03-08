import {NgModule} from '@angular/core';
import {FeatureRestServiceRoutingModule} from './feature-rest-service-routing.module';
import {FeatureRestServiceComponent} from './feature-rest-service.component';

@NgModule({
	imports: [FeatureRestServiceRoutingModule],
	declarations: [FeatureRestServiceComponent],
})
export class FeatureRestServiceModule {}
