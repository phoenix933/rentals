import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { of } from 'rxjs';
import { switchMap, map, catchError, mapTo, filter, tap} from 'rxjs/operators';

import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromRootActions from '../../../../store/actions';
import { AppUser } from '../../../../models/app-user';
import * as fromActions from '../actions';
import { AuthActionTypes } from '../actions';
import { AuthDataService } from './../../services/auth-data/auth-data.service';

@Injectable()
export class AuthEffects {
    constructor(
        private _actions$: Actions,
        private _authDataService: AuthDataService,
        private _snackBar: MatSnackBar
    ) {}

    @Effect()
    register$ = this._actions$
        .pipe(
            ofType(AuthActionTypes.Register),
            map((action: fromActions.Register) => action.payload),
            switchMap(({ username, password, role }) => {
                return this._authDataService
                    .register(username, password, role)
                    .pipe(
                        mapTo(new fromActions.RegisterSuccess(username)),
                        catchError((error) => of(new fromActions.RegisterFailure(error)))
                    );
            })
        );

    @Effect()
    registerSuccess$ = this._actions$
        .pipe(
            ofType(AuthActionTypes.RegisterSuccess),
            map((action: fromActions.RegisterSuccess) => action.payload),
            tap((username: string) => this._snackBar.open(`Registered successfully as ${username}`, 'Dismiss')),
            mapTo(new fromRootActions.Go({ path: ['/auth/login'] }))
        );

    @Effect({ dispatch: false })
    registerFailure$ = this._actions$
        .pipe(
            ofType(AuthActionTypes.RegisterFailure),
            map((action: fromActions.RegisterFailure) => action.payload),
            tap(({ error }) => this._snackBar.open(error.message, 'Alright'))
        );

    @Effect()
    logIn$ = this._actions$
        .pipe(
            ofType(AuthActionTypes.LogIn),
            map((action: fromActions.LogIn) => action.payload),
            switchMap(({ username, password }) => {
                return this._authDataService
                    .logIn(username, password)
                    .pipe(
                        map((user: AppUser) => new fromActions.LogInSuccess(user)),
                        catchError((error) => of(new fromActions.LogInFailure(error)))
                    );
            })
        );

    @Effect()
    logInSuccess$ = this._actions$
        .pipe(
            ofType(AuthActionTypes.LogInSuccess),
            map((action: fromActions.LogInSuccess) => action.payload),
            tap((user: AppUser) => this._snackBar.open(`Logged in as ${user.username}`, 'Dismiss')),
            mapTo(new fromRootActions.Go({ path: ['/apartments'] }))
        );

    @Effect({ dispatch: false })
    logInFailure$ = this._actions$
        .pipe(
            ofType(AuthActionTypes.LogInFailure),
            map((action: fromActions.LogInFailure) => action.payload),
            tap(({ error }) => this._snackBar.open(error.message, 'Alright'))
        );

    @Effect()
    logOut$ = this._actions$
        .pipe(
            ofType(AuthActionTypes.LogOut),
            tap(() => this._snackBar.open(`Logged out successfully`, 'Dismiss')),
            mapTo(new fromActions.SetNotAuthenticated())
        );

    @Effect()
    setNotAuthenticated$ = this._actions$
        .pipe(
            ofType(AuthActionTypes.SetNotAuthenticated),
            mapTo(new fromRootActions.Go({ path: ['/auth/login'] }))
        );
}
