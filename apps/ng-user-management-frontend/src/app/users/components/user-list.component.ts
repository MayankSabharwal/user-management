import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import * as UserActions from '../store/user.actions';
import { selectAllUsers, selectUsersLoading } from '../store/user.selectors';
import { UserFormComponent } from './user-form.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule
  ],
  template: `
    <mat-toolbar color="primary">
      <span>User Management</span>
      <span class="spacer"></span>
      <button mat-raised-button color="accent" (click)="addUser()">
        <b>+</b> Add User
      </button>
    </mat-toolbar>

    <mat-card>
      <mat-card-content>
        <div *ngIf="loading$ | async">Loading...</div>
        <table mat-table [dataSource]="users$" class="mat-elevation-z8">

          <ng-container matColumnDef="username">
            <th mat-header-cell *matHeaderCellDef> Username </th>
            <td mat-cell *matCellDef="let user">{{user.username}}</td>
          </ng-container>

          <ng-container matColumnDef="email">
            <th mat-header-cell *matHeaderCellDef> Email </th>
            <td mat-cell *matCellDef="let user">{{user.email}}</td>
          </ng-container>

          <ng-container matColumnDef="jobRole">
            <th mat-header-cell *matHeaderCellDef> Role </th>
            <td mat-cell *matCellDef="let user">{{user.jobRole}}</td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef> Actions </th>
            <td mat-cell *matCellDef="let user">
              <button mat-icon-button color="primary" (click)="editUser(user)">
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button color="warn" (click)="deleteUser(user.id)">
                <mat-icon>delete</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .spacer { flex: 1 1 auto; }
    table { width: 100%; margin-top: 1rem; }
  `]
})
export class UserListComponent implements OnInit {
  users$!: Observable<User[]>;
  loading$!: Observable<boolean>;  
  constructor(private store: Store, private dialog: MatDialog) {}
  displayedColumns = ['username', 'email', 'jobRole', 'actions'];
  
  
  ngOnInit() {
    this.users$ = this.store.select(selectAllUsers);
    this.loading$ = this.store.select(selectUsersLoading);
    this.store.dispatch(UserActions.loadUsers());
  }

  addUser() {
    this.dialog.open(UserFormComponent, {
      width: '400px'
    });
  }

  editUser(user: User) {
    this.dialog.open(UserFormComponent, {
      width: '400px',
      data: { initialData: user }
    });
  }

  deleteUser(id: number) {
    this.store.dispatch(UserActions.deleteUser({ id }));
  }
}
