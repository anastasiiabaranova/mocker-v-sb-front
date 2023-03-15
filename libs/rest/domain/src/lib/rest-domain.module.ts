import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
	RestMockApiService,
	RestModelApiService,
	RestResponseApiService,
	RestServiceApiService,
} from './services';
import {RestStoreModule} from './store';
import {RestFacade} from './facades';

@NgModule({
	imports: [CommonModule, RestStoreModule],
	providers: [
		RestMockApiService,
		RestModelApiService,
		RestResponseApiService,
		RestServiceApiService,
		RestFacade,
	],
})
export class RestDomainModule {}
