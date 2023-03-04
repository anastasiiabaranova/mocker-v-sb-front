import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {TuiRootModule} from '@taiga-ui/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderModule} from './components';
import {CoreModule} from './core';

@NgModule({
	bootstrap: [AppComponent],
	declarations: [AppComponent],
	imports: [
		CoreModule,
		BrowserModule,
		AppRoutingModule,
		TuiRootModule,
		HeaderModule,
	],
})
export class AppModule {}
