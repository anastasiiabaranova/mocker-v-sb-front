import {NgModule} from '@angular/core';
import {RestHistoryStoreModule} from './store';
import {RestHistoryFacade} from './facades';
import {RestHistoryApiService} from './services';

@NgModule({
	imports: [RestHistoryStoreModule],
	providers: [RestHistoryApiService, RestHistoryFacade],
})
export class RestHistoryDomainModule {}
