import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/component/login.component';
import { RegisterComponent } from './pages/register/component/register.component'
import { HomepageComponent } from './pages/home/component/homepage.component';

export const routes: Routes = [
    {
        path:'',
        title: 'SportLife-home',
        component: HomepageComponent

    },
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


