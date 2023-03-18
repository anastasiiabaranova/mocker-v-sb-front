import {NgModule} from '@angular/core';
import {MQStoreModule} from './store/mq-store.module';
import {MQApiService} from './services';

@NgModule({
	imports: [MQStoreModule],
	providers: [MQApiService],
})
export class MQDomainModule {}
