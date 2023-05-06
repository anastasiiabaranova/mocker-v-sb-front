import {NgModule} from '@angular/core';
import {FeatureRestHistoryRoutingModule} from './feature-rest-history-routing.module';
import {FeatureRestHistoryComponent} from './feature-rest-history.component';

@NgModule({
	declarations: [FeatureRestHistoryComponent],
	imports: [FeatureRestHistoryRoutingModule],
	exports: [FeatureRestHistoryComponent],
})
export class FeatureRestHistoryModule {}
