import { Routes } from '@angular/router';
import { LoginComponent } from './components/login.component/login.component';
import { HomeComponent } from './components/home.component/home.component';
import { authGuard } from './guards/auth-guard';
import { Gallos } from './components/pages/gallos/gallos';
import { Vacunas } from './components/pages/vacunas/vacunas';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent


    },
    {
        path: 'home',
        component: HomeComponent, canActivate: [authGuard],
        children: [
            {
                path: 'gallos', component: Gallos, canActivate: [authGuard]
            },
            {
                path: 'vacunas', component: Vacunas, canActivate: [authGuard]
            },
        ]
    },

    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'

    }

];
