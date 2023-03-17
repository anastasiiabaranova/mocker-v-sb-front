import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GraphQLApiService} from './services';

@NgModule({
	imports: [CommonModule],
	providers: [GraphQLApiService],
})
export class GraphqlDomainModule {}
