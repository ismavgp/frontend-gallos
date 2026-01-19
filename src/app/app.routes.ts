import { Routes } from '@angular/router';
import { LoginPage } from './components/pages/login-page/login-page';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { DashboardComponent } from './components/pages/home-page/dashboard-component/dashboard-component';
import { VacunasComponent } from './components/pages/home-page/vacunas-component/vacunas-component';
import { ReportesComponent } from './components/pages/home-page/reportes-component/reportes-component';
import { AyudaComponent } from './components/pages/home-page/ayuda-component/ayuda-component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomePageComponent,
        children: [
            {
                
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'vacunas',
                component: VacunasComponent
            },
            {
                path: 'reportes',
                component: ReportesComponent
            },
            {

                path: 'ayuda',
                component: AyudaComponent
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: 'login',
        component: LoginPage
    }


];
