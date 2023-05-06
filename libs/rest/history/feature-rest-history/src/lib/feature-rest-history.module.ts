import {NgModule} from '@angular/core';
import {RestHistoryDomainModule} from '@mocker/rest/history/domain';
import {FeatureRestHistoryRoutingModule} from './feature-rest-history-routing.module';
import {FeatureRestHistoryComponent} from './feature-rest-history.component';

@NgModule({
	declarations: [FeatureRestHistoryComponent],
	imports: [FeatureRestHistoryRoutingModule, RestHistoryDomainModule],
	exports: [FeatureRestHistoryComponent],
})
export class FeatureRestHistoryModule {}
