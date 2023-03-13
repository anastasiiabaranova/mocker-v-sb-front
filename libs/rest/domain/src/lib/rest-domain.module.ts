import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
	RestMockApiService,
	RestModelApiService,
	RestResponseApiService,
	RestServiceApiService,
} from './services';

@NgModule({
	imports: [CommonModule],
	providers: [
		RestMockApiService,
		RestModelApiService,
		RestResponseApiService,
		RestServiceApiService,
	],
})
export class RestDomainModule {}
