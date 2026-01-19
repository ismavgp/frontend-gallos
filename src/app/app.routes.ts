import { Routes } from '@angular/router';
import { LoginPage } from './components/pages/login-page/login-page';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { DashboardComponent } from './components/pages/home-page/dashboard-component/dashboard-component';
import { VacunasComponent } from './components/pages/home-page/vacunas-component/vacunas-component';
import { ReportesComponent } from './components/pages/home-page/reportes-component/reportes-component';
import { AyudaComponent } from './components/pages/home-page/ayuda-component/ayuda-component';
import { RegisterPage } from './components/pages/register-page/register-page';
import { ProfilePage } from './components/pages/account/profile-page/profile-page';
import { PasswordChangePage } from './components/pages/account/password-change-page/password-change-page';
import { PaymentMethodsPage } from './components/pages/account/payment-methods-page/payment-methods-page';
import { SettingsPage } from './components/pages/account/settings-page/settings-page';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginPage
    },
    {
        path: 'register',
        component: RegisterPage
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
                path: 'account/profile',
                component: ProfilePage
            },
            {
                path: 'account/password-change',
                component: PasswordChangePage
            },
            {
                path: 'account/payment-methods',
                component: PaymentMethodsPage
            },
            {
                path: 'account/settings',
                component: SettingsPage
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    }


];
