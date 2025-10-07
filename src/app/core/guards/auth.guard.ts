import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

/**
 * AuthGuard - Protege rutas que requieren autenticación
 * Redirige a /login si el usuario no está autenticado
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated().pipe(
    map(isAuth => {
      if (!isAuth) {
        console.warn('Usuario no autenticado, redirigiendo a login');
        router.navigate(['/login']);
        return false;
      }
      return true;
    })
  );
};
