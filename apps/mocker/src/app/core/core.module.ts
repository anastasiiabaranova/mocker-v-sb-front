import {NgModule} from '@angular/core';
import {API_PROVIDERS, APP_PROVIDERS, TUI_PROVIDERS} from './providers';

@NgModule({
	providers: [API_PROVIDERS, APP_PROVIDERS, TUI_PROVIDERS],
})
export class CoreModule {}
