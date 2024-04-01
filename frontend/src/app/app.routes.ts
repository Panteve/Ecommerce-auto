import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/component/login.component';
import { RegisterComponent } from './pages/register/component/register.component'
export const routes: Routes = [
    {
        path: 'login',
        title: 'Ecommerce-iniciar sesion',
        component: LoginComponent,
    },
    {
        path: 'register',
        title: 'Ecommerce-registrarse',
        component: RegisterComponent,
    },
];


