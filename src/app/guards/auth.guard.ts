import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.loading()) {
    return auth.user() ? true : router.createUrlTree(['/login']);
  }

  // Auth is still loading — wait for it (max 3s)
  return new Promise(resolve => {
    const deadline = Date.now() + 3000;
    const check = () => {
      if (!auth.loading() || Date.now() > deadline) {
        resolve(auth.user() ? true : router.createUrlTree(['/login']));
      } else {
        setTimeout(check, 30);
      }
    };
    setTimeout(check, 30);
  });
};
