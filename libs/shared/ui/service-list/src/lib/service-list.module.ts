import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ServiceListComponent} from './service-list.component';
import {ServiceCardModule, ServiceSearchModule} from './components';

@NgModule({
	declarations: [ServiceListComponent],
	imports: [CommonModule, ServiceCardModule, ServiceSearchModule],
	exports: [ServiceListComponent],
})
export class ServiceListModule {}
