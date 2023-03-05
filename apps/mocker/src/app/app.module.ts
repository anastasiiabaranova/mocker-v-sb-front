import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TuiRootModule} from '@taiga-ui/core';
import {RestShellModule} from '@mocker/rest/shell';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderModule} from './components';
import {CoreModule} from './core';

@NgModule({
	bootstrap: [AppComponent],
	declarations: [AppComponent],
	imports: [
		CoreModule,
		RouterModule,
		BrowserModule,
		BrowserAnimationsModule,
		TuiRootModule,
		HeaderModule,
		RestShellModule,
		AppRoutingModule,
	],
})
export class AppModule {}
