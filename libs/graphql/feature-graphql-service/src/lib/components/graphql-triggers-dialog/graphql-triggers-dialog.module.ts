import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TuiButtonModule} from '@taiga-ui/core';
import {TuiToggleModule} from '@taiga-ui/kit';
import {FormsModule} from '@angular/forms';
import {TuiLetModule, TuiMapperPipeModule} from '@taiga-ui/cdk';
import {GraphQLTriggersDialogComponent} from './graphql-triggers-dialog.component';
import {GraphqlTriggerFormModule} from '../graphql-trigger-form/graphql-trigger-form.module';

@NgModule({
	declarations: [GraphQLTriggersDialogComponent],
	imports: [
		CommonModule,
		FormsModule,
		TuiButtonModule,
		TuiToggleModule,
		TuiMapperPipeModule,
		TuiLetModule,
		GraphqlTriggerFormModule,
	],
	exports: [GraphQLTriggersDialogComponent],
})
export class GraphQLTriggersDialogModule {}
