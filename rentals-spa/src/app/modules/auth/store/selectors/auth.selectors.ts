
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppUser } from './../../../../models';
import { AuthState } from '../reducers/auth.reducer';

export const getAuthState = createFeatureSelector<AuthState>('auth');

export const getUser = createSelector(getAuthState, (state: AuthState) => state.user);
export const getRegisterLoading = createSelector(getAuthState, (state: AuthState) => state.registerLoading);
export const getLogInLoading = createSelector(getAuthState, (state: AuthState) => state.logInLoading);

export const getUserToken = createSelector(getUser, (user: AppUser) => user && user.token);
export const getIsAuthenticated = createSelector(getUser, (user: AppUser) => !!user);

export const getUserRole = createSelector(getUser, (user: AppUser) => user && user.role);
