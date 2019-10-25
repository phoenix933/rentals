import { Action } from '@ngrx/store';

import { UserRole } from '../../../../models';
import { User, UserListFilter, GetUsersRes } from '../../models';

export enum UsersActionTypes {
    GetUsers = '[Users] Get Users',
    GetUsersSuccess = '[Users] Get Users Success',
    GetUsersFailure = '[Users] Get Users Failure',

    CreateUser = '[Users] Create User',
    CreateUserSuccess = '[Users] Create User Success',
    CreateUserFailure = '[Users] Create User Failure',

    UpdateUser = '[Users] Update User',
    UpdateUserSuccess = '[Users] Update User Success',
    UpdateUserFailure = '[Users] Update User Failure',

    DeleteUser = '[Users] Delete User',
    DeleteUserSuccess = '[Users] Delete User Success',
    DeleteUserFailure = '[Users] Delete User Failure'
}

export class GetUsers implements Action {
    readonly type = UsersActionTypes.GetUsers;
    constructor(public payload: UserListFilter) {}
}

export class GetUsersSuccess implements Action {
    readonly type = UsersActionTypes.GetUsersSuccess;
    constructor(public payload: GetUsersRes) {}
}

export class GetUsersFailure implements Action {
    readonly type = UsersActionTypes.GetUsersFailure;
}

export class CreateUser implements Action {
    readonly type = UsersActionTypes.CreateUser;
    constructor(public payload: { username: string, password: string; role: UserRole }) {}
}

export class CreateUserSuccess implements Action {
    readonly type = UsersActionTypes.CreateUserSuccess;
    constructor(public payload: string) {}
}

export class CreateUserFailure implements Action {
    readonly type = UsersActionTypes.CreateUserFailure;
    constructor(public payload: string) {}
}

export class UpdateUser implements Action {
    readonly type = UsersActionTypes.UpdateUser;
    constructor(public payload: { username: string; role: UserRole; }) {}
}

export class UpdateUserSuccess implements Action {
    readonly type = UsersActionTypes.UpdateUserSuccess;
    constructor(public payload: string) {}
}

export class UpdateUserFailure implements Action {
    readonly type = UsersActionTypes.UpdateUserFailure;
    constructor(public payload: string) {}
}

export class DeleteUser implements Action {
    readonly type = UsersActionTypes.DeleteUser;
    constructor(public payload: string) {}
}

export class DeleteUserSuccess implements Action {
    readonly type = UsersActionTypes.DeleteUserSuccess;
    constructor(public payload: string) {}
}

export class DeleteUserFailure implements Action {
    readonly type = UsersActionTypes.DeleteUserFailure;
    constructor(public payload: string) {}
}

export type UsersAction =
    | GetUsers
    | GetUsersSuccess
    | GetUsersFailure

    | CreateUser
    | CreateUserSuccess
    | CreateUserFailure

    | UpdateUser
    | UpdateUserSuccess
    | UpdateUserFailure

    | DeleteUser
    | DeleteUserSuccess
    | DeleteUserFailure
;
