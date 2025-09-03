import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { User } from '.././models/user.model';
import * as UserActions from '../store/user.actions';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule
  ],
  template: `
    <div class="form-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ editMode ? 'Edit User' : 'Add User' }}</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
            
            <!-- Username -->
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Username</mat-label>
              <input matInput formControlName="username" />
              <mat-error *ngIf="userForm.get('username')?.invalid && userForm.get('username')?.touched">
                Username is required
              </mat-error>
            </mat-form-field>

            <!-- Email -->
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" />
              <mat-error *ngIf="userForm.get('email')?.invalid && userForm.get('email')?.touched">
                Please enter a valid email
              </mat-error>
            </mat-form-field>

            <!-- Job Role -->
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Job Role</mat-label>
              <mat-select formControlName="jobRole">
                <mat-option value="tech">Tech</mat-option>
                <mat-option value="id">ID</mat-option>
                <mat-option value="gd">GD</mat-option>
                <mat-option value="qa">QA</mat-option>
              </mat-select>
              <mat-error *ngIf="userForm.get('jobRole')?.invalid && userForm.get('jobRole')?.touched">
                Job role is required
              </mat-error>
            </mat-form-field>

            <!-- Submit -->
            <button mat-raised-button color="primary" type="submit" class="full-width">
              {{ editMode ? 'Update' : 'Save' }}
            </button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .form-container {
      display: flex;
      justify-content: center;
      margin-top: 2rem;
    }
    mat-card {
      width: 400px;
      padding: 1rem;
    }
    .full-width {
      width: 100%;
      margin-bottom: 1rem;
    }
  `]
})
export class UserFormComponent implements OnInit {
  @Input() initialData?: User;
  editMode = false;
  userForm: any;
  constructor(private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) {
      this.userForm = this.fb.group({
        id: '',
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        jobRole: ['', Validators.required]
      });
  }



  ngOnInit() {
  if (this.data?.initialData) {
    this.userForm.patchValue(this.data.initialData);
  }
}

onSubmit() {
  if (this.userForm.valid) {
    const user: User = this.userForm.value as User;

    if (this.data?.initialData) {
      this.store.dispatch(UserActions.updateUser({ user }));
    } else {
      let user = {
        username: this.userForm.get('username')?.value,
        email: this.userForm.get('email')?.value,
        jobRole: this.userForm.get('jobRole')?.value
      }
      this.store.dispatch(UserActions.addUser({ user }));
    }

    this.dialogRef.close();
  } else {
    this.userForm.markAllAsTouched();
  }
}
}
