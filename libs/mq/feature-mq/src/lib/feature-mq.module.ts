import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FeatureMQComponent} from './feature-mq.component';
import {FeatureMQRoutingModule} from './feature-mq-routing.module';

@NgModule({
	declarations: [FeatureMQComponent],
	imports: [CommonModule, FeatureMQRoutingModule],
	exports: [FeatureMQComponent],
})
export class FeatureMQModule {}
