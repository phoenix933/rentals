import { Action } from '@ngrx/store';

import { AppUser, UserRole } from '../../../../models';

export enum AuthActionTypes {
    Register = '[Auth] Register',
    RegisterSuccess = '[Auth] Register Success',
    RegisterFailure = '[Auth] Register Failure',

    LogIn = '[Auth] Log In',
    LogInSuccess = '[Auth] Log In Success',
    LogInFailure = '[Auth] Log In Failure',

    LogOut = '[Auth] Log Out',

    SetNotAuthenticated = '[Auth] Set Not Authenticated'
}

export class Register implements Action {
    readonly type = AuthActionTypes.Register;
    constructor(public payload: { username: string; password: string; role: UserRole }) {}
}

export class RegisterSuccess implements Action {
    readonly type = AuthActionTypes.RegisterSuccess;
    constructor(public payload: string) {}
}

export class RegisterFailure implements Action {
    readonly type = AuthActionTypes.RegisterFailure;
    constructor(public payload: any) {}
}

export class LogIn implements Action {
    readonly type = AuthActionTypes.LogIn;
    constructor(public payload: { username: string; password: string; }) {}
}

export class LogInSuccess implements Action {
    readonly type = AuthActionTypes.LogInSuccess;
    constructor(public payload: AppUser) {}
}

export class LogInFailure implements Action {
    readonly type = AuthActionTypes.LogInFailure;
    constructor(public payload: any) {}
}

export class LogOut implements Action {
    readonly type = AuthActionTypes.LogOut;
}

export class SetNotAuthenticated implements Action {
    readonly type = AuthActionTypes.SetNotAuthenticated;
}

export type AuthAction =
    | Register
    | RegisterSuccess
    | RegisterFailure

    | LogIn
    | LogInSuccess
    | LogInFailure

    | LogOut

    | SetNotAuthenticated
;
