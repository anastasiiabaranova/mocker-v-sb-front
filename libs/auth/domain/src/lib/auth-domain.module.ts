import {NgModule} from '@angular/core';
import {AuthStoreModule} from './store';
import {AuthApiService} from './services';

@NgModule({
	imports: [AuthStoreModule],
	providers: [AuthApiService],
})
export class AuthDomainModule {}
