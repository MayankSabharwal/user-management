import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  success(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['snackbar-success']
    });
  }

  error(message: string) {
    this.snackBar.open(message, 'Dismiss', {
      duration: 4000,
      panelClass: ['snackbar-error']
    });
  }

  info(message: string) {
    this.snackBar.open(message, 'Got it', {
      duration: 3000,
      panelClass: ['snackbar-info']
    });
  }
}
