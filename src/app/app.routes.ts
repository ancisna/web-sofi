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
        path: 'workshops',
        component: WorkshopsPageComponent,
      },
    ],
  },
];
