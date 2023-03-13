import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TuiBadgeModule} from '@taiga-ui/kit';
import {ServiceCardComponent} from './service-card.component';

@NgModule({
	declarations: [ServiceCardComponent],
	imports: [CommonModule, TuiBadgeModule],
	exports: [ServiceCardComponent],
})
export class ServiceCardModule {}
