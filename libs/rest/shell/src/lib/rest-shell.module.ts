import {NgModule} from '@angular/core';
import {RestHistoryShellModule} from '@mocker/rest/history/shell';
import {RestShellRoutingModule} from './rest-shell-routing.module';

@NgModule({
	imports: [RestShellRoutingModule, RestHistoryShellModule],
})
export class RestShellModule {}
