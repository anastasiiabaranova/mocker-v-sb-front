import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {reducer} from './graphql.reducer';
import {GraphQLEffects} from './graphql.effects';
import {GRAPHQL_FEATURE} from './graphql-store.feature';

@NgModule({
	imports: [
		StoreModule.forFeature(GRAPHQL_FEATURE, reducer),
		EffectsModule.forFeature([GraphQLEffects]),
	],
})
export class GraphQLStoreModule {}
