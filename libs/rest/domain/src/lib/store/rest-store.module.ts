import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {reducer} from './rest.reducer';
import {RestEffects} from './rest.effects';
import {REST_FEATURE} from './rest-store.feature';

@NgModule({
	imports: [
		StoreModule.forFeature(REST_FEATURE, reducer),
		EffectsModule.forFeature([RestEffects]),
	],
})
export class RestStoreModule {
	constructor() {
		console.log('in RestStoreModule');
	}
}
