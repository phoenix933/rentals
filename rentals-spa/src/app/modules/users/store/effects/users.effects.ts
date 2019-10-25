import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { of } from 'rxjs';
import { switchMap, map, catchError, mapTo, tap, pluck} from 'rxjs/operators';

import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromRootActions from '../../../../store/actions';
import { UsersDataService } from '../../services/users-data/users-data.service';
import { User, UserListFilter, GetUsersRes } from '../../models';
import * as fromActions from '../actions';
import { UsersActionTypes } from '../actions';
import { Action } from '@ngrx/store';

@Injectable()
export class UsersEffects {
    constructor(
        private _actions$: Actions,
        private _usersDataService: UsersDataService,
        private _snackBar: MatSnackBar
    ) {}

    @Effect()
    getUsers$ = this._actions$
        .pipe(
            ofType(UsersActionTypes.GetUsers),
            map((action: fromActions.GetUsers) => action.payload),
            switchMap((listFilter: UserListFilter) => {
                return this._usersDataService
                    .getUsers(listFilter)
                    .pipe(
                        map(({ count, users }: GetUsersRes) => new fromActions.GetUsersSuccess({ count, users })),
                        catchError(() => of(new fromActions.GetUsersFailure()))
                    );
            })
        );

    // Create user
    @Effect()
    createUser$ = this._actions$
        .pipe(
            ofType(UsersActionTypes.CreateUser),
            map((action: fromActions.CreateUser) => action.payload),
            switchMap(({ username, password, role }) => {
                return this._usersDataService
                    .createUser(username, password, role)
                    .pipe(
                        mapTo(new fromActions.CreateUserSuccess(username)),
                        catchError(() => of(new fromActions.CreateUserFailure(username)))
                    );
            })
        );

    @Effect({ dispatch: false })
    createUserSuccess$ = this._createSnackBarEffect(
        UsersActionTypes.CreateUserSuccess,
        'User :username: created successfully!',
        'Yay'
    );

    @Effect({ dispatch: false })
    createUserFailure$ = this._createSnackBarEffect(
        UsersActionTypes.CreateUserFailure,
        'Uh oh! Something wrong happened and we couldn\'t create :username:. Please, try again later!',
        'Sure'
    );

    // Update user
    @Effect()
    updateUser$ = this._actions$
        .pipe(
            ofType(UsersActionTypes.UpdateUser),
            map((action: fromActions.UpdateUser) => action.payload),
            switchMap(({ username, role }) => {
                return this._usersDataService
                    .updateUserRole(username, role)
                    .pipe(
                        mapTo(new fromActions.UpdateUserSuccess(username)),
                        catchError(() => of(new fromActions.UpdateUserFailure(username)))
                    );
            })
        );

    @Effect({ dispatch: false })
    updateUserSuccess$ = this._createSnackBarEffect(
        UsersActionTypes.UpdateUserSuccess,
        'User :username: updated successfully!',
        'Yay'
    );

    @Effect({ dispatch: false })
    updateUserFailure$ = this._createSnackBarEffect(
        UsersActionTypes.UpdateUserFailure,
        'Uh oh! Something wrong happened and we couldn\'t update :username:. Please, try again later!',
        'Sure'
    );

    // Delete
    @Effect()
    deleteUser$ = this._actions$
        .pipe(
            ofType(UsersActionTypes.DeleteUser),
            map((action: fromActions.DeleteUser) => action.payload),
            switchMap((username: string) => {
                return this._usersDataService
                    .deleteUser(username)
                    .pipe(
                        mapTo(new fromActions.DeleteUserSuccess(username)),
                        catchError(() => of(new fromActions.DeleteUserFailure(username)))
                    );
            })
        );

    @Effect({ dispatch: false })
    deleteUserSuccess$ = this._createSnackBarEffect(
        UsersActionTypes.DeleteUserSuccess,
        'User :username: deleted forever!',
        'Alright'
    );

    @Effect({ dispatch: false })
    deleteUserFailure$ = this._createSnackBarEffect(
        UsersActionTypes.DeleteUserFailure,
        'Uh oh! Something wrong happened and we couldn\'t delete :username:. Please, try again later!',
        'No worires'
    );

    private _createSnackBarEffect(actionType: string, message: string, buttonText: string) {
        return this._actions$
            .pipe(
                ofType(actionType),
                pluck('payload'),
                tap((username: string) => this._snackBar.open(message.replace(':username:', username), buttonText))
            );
    }
}
