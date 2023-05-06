import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {reducer} from './rest-history.reducer';
import {RestHistoryEffects} from './rest-history.effects';
import {REST_HISTORY_FEATURE} from './rest-history-store.feature';

@NgModule({
	imports: [
		StoreModule.forFeature(REST_HISTORY_FEATURE, reducer),
		EffectsModule.forFeature([RestHistoryEffects]),
	],
})
export class RestHistoryStoreModule {}
