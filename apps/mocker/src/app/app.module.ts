import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {
	TuiAlertModule,
	TuiDialogModule,
	TuiModeModule,
	TuiRootModule,
} from '@taiga-ui/core';
import {RestShellModule} from '@mocker/rest/shell';
import {GraphqlShellModule} from '@mocker/graphql/shell';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreRouterConnectingModule, routerReducer} from '@ngrx/router-store';
import {CodeEditorModule} from '@ngstack/code-editor';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderModule} from './components';
import {CoreModule} from './core';

@NgModule({
	bootstrap: [AppComponent],
	declarations: [AppComponent],
	imports: [
		StoreModule.forRoot({
			router: routerReducer,
		}),
		EffectsModule.forRoot([]),
		StoreRouterConnectingModule.forRoot(),
		CodeEditorModule.forRoot({
			baseUrl: 'assets/monaco',
			typingsWorkerUrl: 'assets/workers/typings-worker.js',
		}),
		CoreModule,
		RouterModule,
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		TuiRootModule,
		TuiAlertModule,
		TuiDialogModule,
		HeaderModule,
		RestShellModule,
		GraphqlShellModule,
		AppRoutingModule,
		TuiModeModule,
	],
})
export class AppModule {}
