import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {reducer} from './graphql-history.reducer';
import {GraphQLHistoryEffects} from './graphql-history.effects';
import {GRAPHQL_HISTORY_FEATURE} from './graphql-history-store.feature';

@NgModule({
	imports: [
		StoreModule.forFeature(GRAPHQL_HISTORY_FEATURE, reducer),
		EffectsModule.forFeature([GraphQLHistoryEffects]),
	],
})
export class GraphQLHistoryStoreModule {}
