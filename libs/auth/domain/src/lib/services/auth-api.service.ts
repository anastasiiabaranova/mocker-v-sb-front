import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthDto, LoginResponseDto, RefreshDto} from '../dtos';
import {Observable} from 'rxjs';

@Injectable()
export class AuthApiService {
	constructor(private readonly httpClient: HttpClient) {}

	login(data: AuthDto): Observable<LoginResponseDto> {
		return this.httpClient.post<LoginResponseDto>('auth/login', data);
	}

	signup(data: AuthDto): Observable<void> {
		return this.httpClient.post<void>('auth/signup', data);
	}

	refresh(data: RefreshDto): Observable<LoginResponseDto> {
		return this.httpClient.post<LoginResponseDto>(
			'auth/refresh/token',
			data
		);
	}

	logout(): Observable<void> {
		return this.httpClient.post<void>('auth/logout', null);
	}
}
