import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {
	ApiInterceptor,
	AuthErrorInterceptor,
	AuthInterceptor,
} from '../interceptors';

export const API_PROVIDERS = [
	{
		provide: HTTP_INTERCEPTORS,
		useClass: ApiInterceptor,
		multi: true,
	},
	{
		provide: HTTP_INTERCEPTORS,
		useClass: AuthErrorInterceptor,
		multi: true,
	},
	{
		provide: HTTP_INTERCEPTORS,
		useClass: AuthInterceptor,
		multi: true,
	},
];
