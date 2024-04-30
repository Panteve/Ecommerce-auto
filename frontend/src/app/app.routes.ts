import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/home/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component'
import { ClienteInfoComponent } from './pages/cliente-info/cliente-info.component';
import { PedidoInfoComponent } from './pages/pedido-info/pedido-info.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ProductoInfoComponent } from './pages/producto-info/producto-info.component';
import { CarritoComponent } from '@pages/carrito/carrito.component';

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
    {
        path: 'productos/:refproducto',
        title: 'SportLife-Producto ',
        component: ProductoInfoComponent,
    },
    {
        path: 'carrito',
        title: 'SportLife-Mi carrito',
        component: CarritoComponent,
    },
];



