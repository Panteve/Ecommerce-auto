import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/component/login.component';
import { RegisterComponent } from './pages/register/component/register.component'
import { HomepageComponent } from './pages/home/component/homepage.component';
import { ClienteInfoComponent } from './pages/cliente-info/component/cliente-info.component';

export const routes: Routes = [
    {
        path:'',
        title: 'SportLife-home',
        component: HomepageComponent

    },
    {
        path: 'login',
        title: 'SportLife-iniciar sesion',
        component: LoginComponent,
    },
    {
        path: 'register',
        title: 'SportLife-registrarse',
        component: RegisterComponent,
    },
    {
        path: 'client-info',
        title: 'SportLife-cuenta',
        component: ClienteInfoComponent,
    },
];


