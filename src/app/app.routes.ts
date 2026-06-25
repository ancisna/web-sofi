import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { authGuard } from './guards/auth.guard';
import { PublicLayoutComponent } from '@layouts/public-layout/public-layout.component';
import { HomePageComponent } from '@features/public/home-page/home-page.component';
import { TherapiesPageComponent } from '@features/public/therapies-page/therapies-page.component';
import { WorkshopsPageComponent } from '@features/public/workshops-page/workshops-page.component';
import { ArticleService } from '@core/services/article.service';

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
        path: 'constellations',
        loadComponent: () =>
          import('@features/public/constellations-page/constellations-page.component').then(
            (m) => m.ConstellationsPageComponent,
          ),
      },
      {
        path: 'constellations/:id',
        loadComponent: () =>
          import('@features/public/constellation-detail-page/constellation-detail-page.component').then(
            (m) => m.ConstellationDetailPageComponent,
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
        path: 'articles',
        loadComponent: () =>
          import('@features/public/articles-page/articles-page.component').then(
            (m) => m.ArticlesPageComponent,
          ),
        resolve: { articles: () => inject(ArticleService).getPublished() },
      },
      {
        path: 'articles/:slug',
        loadComponent: () =>
          import('@features/public/article-detail-page/article-detail-page.component').then(
            (m) => m.ArticleDetailPageComponent,
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
        canActivate: [authGuard],
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
          {
            path: 'therapies/new',
            loadComponent: () =>
              import('@features/admin/therapy-form-page/therapy-form-page.component').then(
                (m) => m.TherapyFormPageComponent,
              ),
          },
          {
            path: 'therapies/:id/edit',
            loadComponent: () =>
              import('@features/admin/therapy-form-page/therapy-form-page.component').then(
                (m) => m.TherapyFormPageComponent,
              ),
          },
          {
            path: 'workshops',
            loadComponent: () =>
              import('@features/admin/manage-workshops-page/manage-workshops-page.component').then(
                (m) => m.ManageWorkshopsPageComponent,
              ),
          },
          {
            path: 'workshops/new',
            loadComponent: () =>
              import('@features/admin/workshop-form-page/workshop-form-page.component').then(
                (m) => m.WorkshopFormPageComponent,
              ),
          },
          {
            path: 'workshops/:id/edit',
            loadComponent: () =>
              import('@features/admin/workshop-form-page/workshop-form-page.component').then(
                (m) => m.WorkshopFormPageComponent,
              ),
          },
          {
            path: 'articles',
            loadComponent: () =>
              import('@features/admin/manage-articles-page/manage-articles-page.component').then(
                (m) => m.ManageArticlesPageComponent,
              ),
          },
          {
            path: 'articles/new',
            loadComponent: () =>
              import('@features/admin/article-form-page/article-form-page.component').then(
                (m) => m.ArticleFormPageComponent,
              ),
          },
          {
            path: 'articles/:id/edit',
            loadComponent: () =>
              import('@features/admin/article-form-page/article-form-page.component').then(
                (m) => m.ArticleFormPageComponent,
              ),
          },
          {
            path: 'constellations',
            loadComponent: () =>
              import('@features/admin/manage-constellations-page/manage-constellations-page.component').then(
                (m) => m.ManageConstellationsPageComponent,
              ),
          },
          {
            path: 'constellations/new',
            loadComponent: () =>
              import('@features/admin/constellation-form-page/constellation-form-page.component').then(
                (m) => m.ConstellationFormPageComponent,
              ),
          },
          {
            path: 'constellations/:id/edit',
            loadComponent: () =>
              import('@features/admin/constellation-form-page/constellation-form-page.component').then(
                (m) => m.ConstellationFormPageComponent,
              ),
          },
          {
            path: 'categories',
            loadComponent: () =>
              import('@features/admin/manage-categories-page/manage-categories-page.component').then(
                (m) => m.ManageCategoriesPageComponent,
              ),
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('@features/public/login-page/login-page.component').then(
        (m) => m.LoginPageComponent,
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('@features/public/not-found-page/not-found-page.component').then(
        (m) => m.NotFoundPageComponent,
      ),
  },
];
