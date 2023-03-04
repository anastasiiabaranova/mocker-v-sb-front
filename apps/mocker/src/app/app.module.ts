import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {TuiRootModule} from '@taiga-ui/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderModule} from './components';
import {APP_PROVIDERS} from './core';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, AppRoutingModule, TuiRootModule, HeaderModule],
	providers: [...APP_PROVIDERS],
	bootstrap: [AppComponent],
})
export class AppModule {}
