import * as fromActions from '../actions';
import { UsersActionTypes } from '../actions';

import { User } from '../../models';

export interface UsersState {
    users: User[];
    count: number;
    getUsersLoading: boolean;
    createUserLoading: boolean;
    updateUserLoading: boolean;
    deleteUserLoading: boolean;
}

export const initialState: UsersState = {
    users: [],
    count: 0,
    getUsersLoading: false,
    createUserLoading: false,
    updateUserLoading: false,
    deleteUserLoading: false
};

export function reducer(state = initialState, action: fromActions.UsersAction): UsersState {
    switch (action.type) {
        case UsersActionTypes.GetUsers: {
            return {
                ...state,
                getUsersLoading: true
            };
        }

        case UsersActionTypes.GetUsersSuccess: {
            const { count, users } = action.payload;
            return {
                ...state,
                users,
                count,
                getUsersLoading: false
            };
        }

        case UsersActionTypes.GetUsersFailure: {
            return {
                ...state,
                getUsersLoading: false
            };
        }

        case UsersActionTypes.CreateUser: {
            return {
                ...state,
                createUserLoading: true
            };
        }

        case UsersActionTypes.CreateUserSuccess:
        case UsersActionTypes.CreateUserFailure: {
            return {
                ...state,
                createUserLoading: false
            };
        }

        case UsersActionTypes.UpdateUser: {
            return {
                ...state,
                updateUserLoading: true
            };
        }

        case UsersActionTypes.UpdateUserSuccess:
        case UsersActionTypes.UpdateUserFailure: {
            return {
                ...state,
                updateUserLoading: false
            };
        }

        case UsersActionTypes.DeleteUser: {
            return {
                ...state,
                deleteUserLoading: true
            };
        }

        case UsersActionTypes.DeleteUserSuccess:
        case UsersActionTypes.DeleteUserFailure: {
            return {
                ...state,
                deleteUserLoading: false
            };
        }

    }

    return state;
}
