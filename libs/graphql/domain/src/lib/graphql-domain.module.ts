import {NgModule} from '@angular/core';
import {GraphQLApiService} from './services';
import {GraphQLFacade} from './facades';
import {GraphQLStoreModule} from './store';

@NgModule({
	imports: [GraphQLStoreModule],
	providers: [GraphQLApiService, GraphQLFacade],
})
export class GraphQLDomainModule {}
