import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ServiceListComponent} from './service-list.component';
import {ServiceCardModule, ServiceSearchModule} from './components';
import {TuiScrollbarModule} from '@taiga-ui/core';

@NgModule({
	declarations: [ServiceListComponent],
	imports: [
		CommonModule,
		ServiceCardModule,
		ServiceSearchModule,
		TuiScrollbarModule,
	],
	exports: [ServiceListComponent],
})
export class ServiceListModule {}
