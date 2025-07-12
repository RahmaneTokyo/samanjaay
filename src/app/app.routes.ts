import { Route } from '@angular/router';
import {NoAuthGuard} from "./core/auth/guards/noAuth.guard";
import {AuthGuard} from "./core/auth/guards/auth.guard";

// prettier-ignore
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/dashboards/project'
    {path: '', pathMatch : 'full', redirectTo: 'sign-in'},

    {
        canActivate: [NoAuthGuard],
        path: 'sign-in',
        loadChildren: () => import('app/modules/auth/sign-in/sign-in.routes'),
    },

    {
        canActivate: [NoAuthGuard],
        path: 'forgot-password',
        loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.routes'),
    },

    {
        canActivate: [NoAuthGuard],
        path: 'confirmation-required',
        loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.routes'),
    },

    {
        canActivate: [NoAuthGuard],
        path: 'reset-password',
        loadChildren: () => import('app/modules/auth/reset-password/reset-password.routes'),
    },

    {
        canActivate: [AuthGuard],
        path: 'home',
        loadChildren: () => import('app/modules/home/home.routes'),
    }
];
