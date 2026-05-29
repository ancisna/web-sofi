import { Routes } from '@angular/router';

import { PublicLayoutComponent } from '@layouts/public-layout/public-layout.component';

import { HomePageComponent } from '@features/public/home-page/home-page.component';

import { TherapiesPageComponent } from '@features/public/therapies-page/therapies-page.component';

import { WorkshopsPageComponent } from '@features/public/workshops-page/workshops-page.component';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        component: HomePageComponent,
      },
      {
        path: 'therapies',
        component: TherapiesPageComponent,
      },
      {
        path: 'therapies/:id',
        loadComponent: () =>
          import('@features/public/therapy-detail-page/therapy-detail-page.component').then(
            (m) => m.TherapyDetailPageComponent,
          ),
      },
      {
        path: 'workshops',
        component: WorkshopsPageComponent,
      },
      {
        path: 'workshops/:id',

        loadComponent: () =>
          import('@features/public/workshop-detail-page/workshop-detail-page.component').then(
            (m) => m.WorkshopDetailPageComponent,
          ),
      },
      {
        path: 'about',

        loadComponent: () =>
          import('@features/public/about-page/about-page.component').then(
            (m) => m.AboutPageComponent,
          ),
      },
      {
        path: 'contact',

        loadComponent: () =>
          import('@features/public/contact-page/contact-page.component').then(
            (m) => m.ContactPageComponent,
          ),
      },
      {
        path: 'dashboard',

        loadComponent: () =>
          import('@layouts/admin-layout/admin-layout.component').then(
            (m) => m.AdminLayoutComponent,
          ),

        children: [
          {
            path: '',

            loadComponent: () =>
              import('@features/admin/dashboard-page/dashboard-page.component').then(
                (m) => m.DashboardPageComponent,
              ),
          },
          {
            path: 'therapies',

            loadComponent: () =>
              import('@features/admin/manage-therapies-page/manage-therapies-page.component').then(
                (m) => m.ManageTherapiesPageComponent,
              ),
          },
        ],
      },
    ],
  },
];
