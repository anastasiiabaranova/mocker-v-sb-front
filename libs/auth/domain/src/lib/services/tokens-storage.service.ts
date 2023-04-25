import {Injectable} from '@angular/core';

const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';

@Injectable()
export class TokensStorageService {
	get accessToken(): string | null {
		return localStorage.getItem(ACCESS_TOKEN);
	}

	set accessToken(value: string | null) {
		if (value) {
			localStorage.setItem(ACCESS_TOKEN, value);
		} else {
			localStorage.removeItem(ACCESS_TOKEN);
		}
	}

	get refreshToken(): string | null {
		return localStorage.getItem(REFRESH_TOKEN);
	}

	set refreshToken(value: string | null) {
		if (value) {
			localStorage.setItem(REFRESH_TOKEN, value);
		} else {
			localStorage.removeItem(REFRESH_TOKEN);
		}
	}

	clearTokens() {
		this.accessToken = null;
		this.refreshToken = null;
	}
}
