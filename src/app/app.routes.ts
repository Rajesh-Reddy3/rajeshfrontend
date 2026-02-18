import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./landing/landing.component').then((m) => m.LandingComponent),
  },
  {
    path: 'app',
    loadComponent: () =>
      import('./layout/main-layout/main-layout.component').then(
        (m) => m.MainLayoutComponent,
      ),

    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./about/about.component').then((m) => m.AboutComponent),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./users/user-list/user-list.component').then(
            (m) => m.UserListComponent,
          ),
      },
      {
        path: 'users/edit/:id',
        loadComponent: () =>
          import('./users/user-edit/user-edit.component').then(
            (m) => m.UserEditComponent,
          ),
      },
      {
        path: 'users/new',
        loadComponent: () =>
          import('./users/user-edit/user-edit.component').then(
            (m) => m.UserEditComponent,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
