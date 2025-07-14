import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { of, switchMap } from 'rxjs';
import {jwtDecode} from "jwt-decode";

export const NoAuthGuard: CanActivateFn | CanActivateChildFn = (
    route,
    state
) => {
    const router: Router = inject(Router);
    const auth = inject(AuthService);

    if (auth.isTokenValid()) {
        const role = jwtDecode(auth.accessToken).role;

        if (role == 'USER') {
            return of(router.parseUrl('/home')) // Redirect if token is valid
        }

        if (role == 'ADMIN') {
            return of(router.parseUrl('/home/utilisateurs'))
        }
    }
    return true; // Allow to access login page if token is invalid or absent
};

