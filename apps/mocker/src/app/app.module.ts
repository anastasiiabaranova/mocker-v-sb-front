import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {TuiModeModule, TuiRootModule} from '@taiga-ui/core';
import {RestShellModule} from '@mocker/rest/shell';
import {GraphqlShellModule} from '@mocker/graphql/shell';

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
		HttpClientModule,
		TuiRootModule,
		HeaderModule,
		RestShellModule,
		GraphqlShellModule,
		AppRoutingModule,
		TuiModeModule,
	],
})
export class AppModule {}
