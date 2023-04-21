import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header.component';
import {TuiButtonModule, TuiSvgModule} from '@taiga-ui/core';
import {TuiTabsModule} from '@taiga-ui/kit';
import {RouterModule} from '@angular/router';
import {TuiMapperPipeModule} from '@taiga-ui/cdk';

@NgModule({
	declarations: [HeaderComponent],
	imports: [
		CommonModule,
		TuiSvgModule,
		TuiTabsModule,
		RouterModule,
		TuiButtonModule,
		TuiMapperPipeModule,
	],
	exports: [HeaderComponent],
})
export class HeaderModule {}
