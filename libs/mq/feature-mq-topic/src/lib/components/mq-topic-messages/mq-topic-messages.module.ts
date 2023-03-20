import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TuiButtonModule, TuiLoaderModule} from '@taiga-ui/core';
import {TuiTableModule, TuiTablePaginationModule} from '@taiga-ui/addon-table';
import {TuiLetModule} from '@taiga-ui/cdk';

import {MQTopicMessagesComponent} from './mq-topic-messages.component';
import {MessageSendDialogModule} from '../message-send-dialog/message-send-dialog.module';

@NgModule({
	declarations: [MQTopicMessagesComponent],
	imports: [
		CommonModule,
		TuiButtonModule,
		TuiTableModule,
		TuiLoaderModule,
		TuiLetModule,
		MessageSendDialogModule,
		TuiTablePaginationModule,
	],
	exports: [MQTopicMessagesComponent],
})
export class MQTopicMessagesModule {}
