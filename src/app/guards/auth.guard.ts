import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

export const authGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Esperar inicialización
  await auth.initialize();

  if (auth.user()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
