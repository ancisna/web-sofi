import { ApplicationConfig } from '@angular/core';

import { provideRouter } from '@angular/router';

import { provideZoneChangeDetection } from '@angular/core';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({
      eventCoalescing: true,
    }),

    provideRouter(routes),

    provideAnimationsAsync(),

    ConfirmationService,
    MessageService,
  ],
};
