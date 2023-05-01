import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TuiButtonModule} from '@taiga-ui/core';
import {TuiToggleModule} from '@taiga-ui/kit';
import {FormsModule} from '@angular/forms';
import {GraphQLTriggersDialogComponent} from './graphql-triggers-dialog.component';

@NgModule({
	declarations: [GraphQLTriggersDialogComponent],
	imports: [CommonModule, FormsModule, TuiButtonModule, TuiToggleModule],
	exports: [GraphQLTriggersDialogComponent],
})
export class GraphQLTriggersDialogModule {}
