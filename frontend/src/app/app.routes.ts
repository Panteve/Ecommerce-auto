import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/home/component/homepage.component';
import { LoginComponent } from './pages/login/component/login.component';
import { RegisterComponent } from './pages/register/component/register.component'
import { ClienteInfoComponent } from './pages/cliente-info/component/cliente-info.component';
import { PedidoInfoComponent } from './pages/pedido-info/component/pedido-info.component';
import { ProductosComponent } from './pages/productos/component/productos.component';

export const routes: Routes = [
    {
        path:'',
        title: 'SportLife-Home',
        component: HomepageComponent

    },
    {
        path: 'login',
        title: 'SportLife-Iniciar sesion',
        component: LoginComponent,
    },
    {
        path: 'register',
        title: 'SportLife-Registrarse',
        component: RegisterComponent,
    },
    {
        path: 'mi-cuenta',
        title: 'SportLife-Cuenta',
        component: ClienteInfoComponent,
    },
    {
        path: 'pedido/:refpedido',
        title: 'SportLife-Informacion del pedido',
        component: PedidoInfoComponent,
    },
    {
        path: 'productos',
        title: 'SportLife-Productos',
        component: ProductosComponent,
    },
];



