import {NgModule} from '@angular/core';
import {APP_PROVIDERS, TUI_PROVIDERS} from './providers';

@NgModule({
	providers: [APP_PROVIDERS, TUI_PROVIDERS],
})
export class CoreModule {}
