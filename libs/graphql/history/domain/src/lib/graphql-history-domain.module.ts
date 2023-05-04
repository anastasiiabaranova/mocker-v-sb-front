import {NgModule} from '@angular/core';
import {GraphQLHistoryApiService} from './services';
import {GraphQLHistoryStoreModule} from './store';

@NgModule({
	imports: [GraphQLHistoryStoreModule],
	providers: [GraphQLHistoryApiService],
})
export class GraphQLHistoryDomainModule {}
