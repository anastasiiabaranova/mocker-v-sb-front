import {Injectable} from '@angular/core';
import {HttpClient, HttpContext} from '@angular/common/http';
import {AuthDto, LoginResponseDto, RefreshDto} from '../dtos';
import {Observable} from 'rxjs';
import {UNAUTHORIZED} from '../tokens';

@Injectable()
export class AuthApiService {
	constructor(private readonly httpClient: HttpClient) {}

	login(data: AuthDto): Observable<LoginResponseDto> {
		return this.httpClient.post<LoginResponseDto>('auth/login', data, {
			context: new HttpContext().set(UNAUTHORIZED, true),
		});
	}

	signup(data: AuthDto): Observable<void> {
		return this.httpClient.post<void>('auth/signup', data, {
			context: new HttpContext().set(UNAUTHORIZED, true),
		});
	}

	refresh(data: RefreshDto): Observable<LoginResponseDto> {
		return this.httpClient.post<LoginResponseDto>(
			'auth/refresh/token',
			data,
			{context: new HttpContext().set(UNAUTHORIZED, true)}
		);
	}

	logout(): Observable<void> {
		return this.httpClient.post<void>('auth/logout', null);
	}
}
