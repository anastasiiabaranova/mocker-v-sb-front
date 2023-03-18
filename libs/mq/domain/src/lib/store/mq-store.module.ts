import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {reducer} from './mq.reducer';
import {MQEffects} from './mq.effects';
import {MQ_FEATURE} from './mq-store.feature';

@NgModule({
	imports: [
		StoreModule.forFeature(MQ_FEATURE, reducer),
		EffectsModule.forFeature([MQEffects]),
	],
})
export class MQStoreModule {}
