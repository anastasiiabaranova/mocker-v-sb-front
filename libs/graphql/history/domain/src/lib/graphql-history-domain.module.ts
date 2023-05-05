import {NgModule} from '@angular/core';
import {GraphQLHistoryFacade} from './facades';
import {GraphQLHistoryApiService} from './services';
import {GraphQLHistoryStoreModule} from './store';

@NgModule({
	imports: [GraphQLHistoryStoreModule],
	providers: [GraphQLHistoryApiService, GraphQLHistoryFacade],
})
export class GraphQLHistoryDomainModule {}
