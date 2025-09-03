import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  template: `
    <div class="login-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>User Login</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="loginForm" (ngSubmit)="onLogin()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Username</mat-label>
              <input matInput formControlName="username" />
            @if(loginForm.get('username')?.invalid && loginForm.get('username')?.touched){
                  <mat-error>
                    Username is required
                  </mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Password</mat-label>
              <input matInput type="password" formControlName="password" />
              @if(loginForm.get('password')?.invalid && loginForm.get('password')?.touched){
                  <mat-error>
                    Password is required
                  </mat-error>
              }
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" class="full-width">
              Login
            </button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    mat-card {
      width: 350px;
      padding: 1rem;
    }
    .full-width {
      width: 100%;
      margin-bottom: 1rem;
    }
  `]
})
export class LoginComponent {
  constructor(private formBuilder: FormBuilder, private router: Router) {}

  loginForm: any;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
        const { username, password } = this.loginForm.value;
        if (username === 'Admin' && password === '1234') {
            this.router.navigate(['/users']);
        }else{
            alert("Invalid credentials");
        }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
