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
    ],
  },
];
