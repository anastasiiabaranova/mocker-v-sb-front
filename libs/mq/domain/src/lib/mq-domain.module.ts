import {NgModule} from '@angular/core';
import {MQStoreModule} from './store';
import {MQApiService} from './services';
import {MQFacade} from './facades';

@NgModule({
	imports: [MQStoreModule],
	providers: [MQApiService, MQFacade],
})
export class MQDomainModule {}
