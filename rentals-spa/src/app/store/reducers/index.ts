import { ActionReducerMap, MetaReducer, ActionReducer } from '@ngrx/store';
import * as fromRouterStore from '@ngrx/router-store';

import { localStorageSync } from 'ngrx-store-localstorage';

import * as fromAuth from '../../modules/auth/store';
import * as fromUsers from '../../modules/users/store';
import { RouterStateUrl } from './router.reducer';

export interface State {
    routerReducer: fromRouterStore.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
    routerReducer: fromRouterStore.routerReducer,
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({ keys: ['auth'], rehydrate: true })(reducer);
}

export function clearState(reducer): any {
    return (state, action): any => {
        if (action.type === fromAuth.AuthActionTypes.SetNotAuthenticated) {
            state = {
                ...state,
                auth: fromAuth.initialState,
                users: fromUsers.initialState
            };
        }

        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<State>[] = [localStorageSyncReducer, clearState];

export * from './router.reducer';
