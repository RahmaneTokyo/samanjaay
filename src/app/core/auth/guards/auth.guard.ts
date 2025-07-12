import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { of, switchMap } from 'rxjs';

export const AuthGuard: CanActivateFn | CanActivateChildFn = (route, state) => {
    const router: Router = inject(Router);
    const auth = inject(AuthService);

    if (!auth.isTokenValid()) {
        return of(router.parseUrl('/sign-in')) // Redirect if token is valid
    }
    return true; // Allow to access login page if token is invalid or absent
};

