import {NgModule} from '@angular/core';
import {FeatureRestServiceRoutingModule} from './feature-rest-routing.module';
import {FeatureRestServiceComponent} from './feature-rest-service.component';

@NgModule({
	imports: [FeatureRestServiceRoutingModule],
	declarations: [FeatureRestServiceComponent],
})
export class FeatureRestServiceModule {}
