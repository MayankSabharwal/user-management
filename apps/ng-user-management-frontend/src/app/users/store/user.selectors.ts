import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducers';

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectAllUsers = createSelector(selectUserState, state => state.users);
export const selectUsersLoading = createSelector(selectUserState, state => state.loading);
export const selectUsersError = createSelector(selectUserState, state => state.error);
export const selectUserById = (id: number) => createSelector(selectAllUsers, users => users.find(user => user.id === id));
