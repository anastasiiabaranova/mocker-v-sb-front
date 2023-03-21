import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateMockDialogComponent} from './create-mock-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import {
	TuiDataListWrapperModule,
	TuiFieldErrorPipeModule,
	TuiInputModule,
	TuiInputTagModule,
	TuiSelectModule,
} from '@taiga-ui/kit';
import {
	TuiButtonModule,
	TuiErrorModule,
	TuiHintModule,
	TuiLoaderModule,
	TuiTextfieldControllerModule,
	TuiTooltipModule,
} from '@taiga-ui/core';
import {TuiLetModule} from '@taiga-ui/cdk';

@NgModule({
	declarations: [CreateMockDialogComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		TuiTextfieldControllerModule,
		TuiInputModule,
		TuiSelectModule,
		TuiErrorModule,
		TuiFieldErrorPipeModule,
		TuiDataListWrapperModule,
		TuiLetModule,
		TuiTooltipModule,
		TuiHintModule,
		TuiInputTagModule,
		TuiButtonModule,
		TuiLoaderModule,
	],
	exports: [CreateMockDialogComponent],
})
export class CreateMockDialogModule {}
