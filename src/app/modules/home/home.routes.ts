import {Routes} from "@angular/router";
import {HomeComponent} from "./home.component";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {VentesComponent} from "../ventes/ventes.component";
import {ProfileComponent} from "../profile/profile.component";

export default [
    {
        path: '',
        component: HomeComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'ventes', component: VentesComponent },
            { path: 'profile', component: ProfileComponent },
        ],
    }
] as Routes
