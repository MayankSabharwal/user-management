import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from './user.actions';
import { UserService } from '../services/user.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import { NotificationService } from '../../shared/services/notification.services';

@Injectable()
export class UserEffects {
  loadUsers$;
  addUser$;
  updateUser$;
  deleteUser$;

  constructor(private actions$: Actions, private userService: UserService, private notify: NotificationService) {
    this.loadUsers$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.loadUsers),
        mergeMap(() =>
          this.userService.getUsers().pipe(
            map(users => UserActions.loadUsersSuccess({ users })),
            catchError(error => of(UserActions.loadUsersFailure({ error })))
          )
        )
      )
    );

    this.addUser$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.addUser),
        mergeMap(({ user }) =>
          this.userService.addUser(user).pipe(
            map(newUser => {
              this.notify.success('User added successfully');
              return UserActions.addUserSuccess({ user: newUser });
            }),
            catchError(error => {
              this.notify.error('Failed to add user');
              return of(UserActions.addUserFailure({ error }));
            })
          )
        )
      )
    );

    this.updateUser$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.updateUser),
        mergeMap(({ user }) =>
          this.userService.updateUser(user).pipe(
            map(newUser => {
              this.notify.success('User updated successfully');
              return UserActions.updateUserSuccess({ user: newUser });
            }),
            catchError(error => {
              this.notify.error('Failed to update user');
              return of(UserActions.updateUserFailure({ error }));
            })
          )
        )
      )
    );

    this.deleteUser$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.deleteUser),
        mergeMap(({ id }) =>
          this.userService.deleteUser(id).pipe(
            map(() => {
              this.notify.success('User deleted successfully');
              return UserActions.deleteUserSuccess({ id });
            }),
            catchError(error => {
              this.notify.error('Failed to delete user');
              return of(UserActions.deleteUserFailure({ error }));
            })
          )
        )
      )
    );
  }
}
