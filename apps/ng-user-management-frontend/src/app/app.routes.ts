import { Route } from '@angular/router';
import { LoginComponent } from './auth/login.component';

export const appRoutes: Route[] = [
    { path: '', component: LoginComponent },
    { 
    path: 'users',
    loadComponent: () => import('./users/components/user-list.component').then(m => m.UserListComponent)
    },
    {
    path: 'users/add-user',
    loadComponent: () =>
        import('./users/components/user-form.component').then(m => m.UserFormComponent)
    },
    {
    path: 'users/edit-user/:id',
    loadComponent: () =>
        import('./users/components/user-form.component').then(m => m.UserFormComponent)
    }
];
