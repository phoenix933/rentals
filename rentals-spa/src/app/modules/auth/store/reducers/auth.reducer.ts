import * as fromActions from '../actions';
import { AuthActionTypes } from '../actions';

import { AppUser } from '../../../../models';

export interface AuthState {
    user: AppUser;
    registerLoading: boolean;
    logInLoading: boolean;
}

export const initialState: AuthState = {
    user: null,
    registerLoading: false,
    logInLoading: false
};

export function reducer(state = initialState, action: fromActions.AuthAction): AuthState {
    switch (action.type) {
        case AuthActionTypes.Register: {
            return {
                ...state,
                registerLoading: true
            };
        }

        case AuthActionTypes.RegisterSuccess:
        case AuthActionTypes.RegisterFailure: {
            return {
                ...state,
                registerLoading: false
            };
        }

        case AuthActionTypes.LogIn: {
            return {
                ...state,
                logInLoading: true
            };
        }

        case AuthActionTypes.LogInSuccess: {
            const user = action.payload;
            return {
                ...state,
                user,
                logInLoading: false
            };
        }

        case AuthActionTypes.LogInFailure: {
            return {
                ...state,
                logInLoading: false
            };
        }

        case AuthActionTypes.LogOut: {
            return {
                ...state,
                user: null
            };
        }
    }

    return state;
}
