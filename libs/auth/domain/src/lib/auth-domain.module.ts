import {NgModule} from '@angular/core';
import {AuthStoreModule} from './store';
import {AuthApiService, TokensStorageService} from './services';
import {AuthFacade} from './facades';

@NgModule({
	imports: [AuthStoreModule],
	providers: [AuthApiService, TokensStorageService, AuthFacade],
})
export class AuthDomainModule {}
