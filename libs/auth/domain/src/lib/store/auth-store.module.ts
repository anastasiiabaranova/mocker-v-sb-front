import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {reducer} from './auth.reducer';
import {AuthEffects} from './auth.effects';
import {AUTH_FEATURE} from './auth-store.feature';

@NgModule({
	imports: [
		StoreModule.forFeature(AUTH_FEATURE, reducer),
		EffectsModule.forFeature([AuthEffects]),
	],
})
export class AuthStoreModule {}
