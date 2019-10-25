import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

import { UserRole } from '../../../../models';
import * as fromUsers from '../../store';
import { User, UserListFilter } from '../../models';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private _createUserSuccess$ = new Subject<void>();
    private _updateUserSuccess$ = new Subject<void>();
    private _deleteUserSuccess$ = new Subject<void>();

    constructor(
        private _store: Store<fromUsers.UsersState>,
        private _actions$: Actions
    ) {
        this._actions$
            .pipe(ofType(fromUsers.UsersActionTypes.CreateUserSuccess))
            .subscribe(() => this._createUserSuccess$.next());

        this._actions$
            .pipe(ofType(fromUsers.UsersActionTypes.UpdateUserSuccess))
            .subscribe(() => this._updateUserSuccess$.next());

        this._actions$
            .pipe(ofType(fromUsers.UsersActionTypes.DeleteUserSuccess))
            .subscribe(() => this._deleteUserSuccess$.next());
    }

    // Actions
    getUsers(filter: UserListFilter): void {
        this._store.dispatch(new fromUsers.GetUsers(filter));
    }

    createUser(username: string, password: string, role: UserRole): void {
        this._store.dispatch(new fromUsers.CreateUser({ username, password, role }));
    }

    updateUser(username: string, role: UserRole): void {
        this._store.dispatch(new fromUsers.UpdateUser({ username, role }));
    }

    deleteUser(username: string): void {
        this._store.dispatch(new fromUsers.DeleteUser(username));
    }

    // Selectors
    get users$(): Observable<User[]> {
        return this._store.pipe(select(fromUsers.getUsers));
    }

    get usersCount$(): Observable<number> {
        return this._store.pipe(select(fromUsers.getUsersCount));
    }

    get getUsersLoading$(): Observable<boolean> {
        return this._store.pipe(select(fromUsers.getGetUsersLoading));
    }

    get createUserLoading$(): Observable<boolean> {
        return this._store.pipe(select(fromUsers.getCreateUserLoading));
    }

    get updateUserLoading$(): Observable<boolean> {
        return this._store.pipe(select(fromUsers.getUpdateUserLoading));
    }

    get deleteUserLoading$(): Observable<boolean> {
        return this._store.pipe(select(fromUsers.getDeleteUserLoading));
    }

    // Events
    get createUserSuccess$(): Observable<void> {
        return this._createUserSuccess$.asObservable();
    }

    get updateUserSuccess$(): Observable<void> {
        return this._updateUserSuccess$.asObservable();
    }

    get deleteUserSuccess$(): Observable<void> {
        return this._deleteUserSuccess$.asObservable();
    }
}
