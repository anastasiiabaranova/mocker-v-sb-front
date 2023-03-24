import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ApiInterceptor} from '../interceptors';

export const API_PROVIDERS = [
	{
		provide: HTTP_INTERCEPTORS,
		useClass: ApiInterceptor,
		multi: true,
	},
];
