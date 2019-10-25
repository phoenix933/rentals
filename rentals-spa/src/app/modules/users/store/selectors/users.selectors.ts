
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { UsersState } from '../reducers/users.reducer';

export const getUsersState = createFeatureSelector<UsersState>('users');

export const getUsers = createSelector(getUsersState, (state: UsersState) => state.users);
export const getUsersCount = createSelector(getUsersState, (state: UsersState) => state.count);

export const getGetUsersLoading = createSelector(getUsersState, (state: UsersState) => state.getUsersLoading);
export const getCreateUserLoading = createSelector(getUsersState, (state: UsersState) => state.createUserLoading);
export const getUpdateUserLoading = createSelector(getUsersState, (state: UsersState) => state.updateUserLoading);
export const getDeleteUserLoading = createSelector(getUsersState, (state: UsersState) => state.deleteUserLoading);
