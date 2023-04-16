import {HttpContextToken} from '@angular/common/http';

export const UNAUTHORIZED = new HttpContextToken<boolean>(() => false);
