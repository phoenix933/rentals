import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import { UserRole } from '../../../../models';
import { User, UserListFilter, GetUsersRes } from '../../models';

@Injectable({
    providedIn: 'root'
})
export class UsersDataService {
    private readonly _usersUrl = `${environment.apiUrl}/users`;

    constructor(
        private _http: HttpClient
    ) {}

    getUsers(filter: UserListFilter): Observable<GetUsersRes> {
        const params = Object.keys(filter)
            .reduce((res, key) => filter[key] ? { ...res, [key]: `${filter[key]}` } : res, {});

        return this._http.get<GetUsersRes>(this._usersUrl, { params });
    }

    createUser(username: string, password: string, role: UserRole): Observable<void> {
        return this._http.post<void>(this._usersUrl, { username, password, role });
    }

    updateUserRole(username: string, role: UserRole): Observable<User> {
        return this._http.patch<User>(`${this._usersUrl}/${username}/role`, { role });
    }

    deleteUser(username: string): Observable<void> {
        return this._http.delete<void>(`${this._usersUrl}/${username}`);
    }

    getRealtors(): Observable<GetUsersRes> {
        const filter: UserListFilter = { role: UserRole.Realtor };
        return this.getUsers(filter);
    }
}
