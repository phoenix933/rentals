import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';

import { UserRole, AppUser } from '../../../../models';
import * as fromAuth from '../../store';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private _store: Store<fromAuth.AuthState>
    ) {}

    // Actions
    register(username: string, password: string, role: UserRole): void {
        this._store.dispatch(new fromAuth.Register({ username, password, role }));
    }

    logIn(username: string, password: string): void {
        this._store.dispatch(new fromAuth.LogIn({ username, password }));
    }

    logOut(): void {
        this._store.dispatch(new fromAuth.LogOut());
    }

    setNotAuthenticated(): void {
        this._store.dispatch(new fromAuth.SetNotAuthenticated());
    }

    // Selectors
    get user$(): Observable<AppUser> {
        return this._store.pipe(select(fromAuth.getUser));
    }

    get registerLoading$(): Observable<boolean> {
        return this._store.pipe(select(fromAuth.getRegisterLoading));
    }

    get logInLoading$(): Observable<boolean> {
        return this._store.pipe(select(fromAuth.getLogInLoading));
    }

    get userToken$(): Observable<string> {
        return this._store.pipe(select(fromAuth.getUserToken));
    }

    get isAuthenticated$(): Observable<boolean> {
        return this._store.pipe(select(fromAuth.getIsAuthenticated));
    }

    get userRole$(): Observable<UserRole | null> {
        return this._store.pipe(select(fromAuth.getUserRole));
    }
}
