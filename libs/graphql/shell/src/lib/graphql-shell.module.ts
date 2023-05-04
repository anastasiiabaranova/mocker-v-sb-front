import {NgModule} from '@angular/core';
import {GraphQLHistoryShellModule} from '@mocker/graphql/history/shell';
import {GraphQLShellRoutingModule} from './graphql-shell-routing.module';

@NgModule({
	imports: [GraphQLShellRoutingModule, GraphQLHistoryShellModule],
})
export class GraphQLShellModule {}
