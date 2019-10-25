import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from './../../../../../environments/environment';
import { UserRole, AppUser } from '../../../../models';

@Injectable({
    providedIn: 'root'
})
export class AuthDataService {
    private readonly _authUrl = `${environment.apiUrl}/auth`;

    constructor(
        private _http: HttpClient
    ) {}

    register(username: string, password: string, role: UserRole): Observable<void> {
        return this._http
            .post<void>(`${this._authUrl}/register`, { username, password, role });
    }

    logIn(username: string, password: string): Observable<AppUser> {
        return this._http
            .post<AppUser>(`${this._authUrl}/login`, { username, password });
    }
}
