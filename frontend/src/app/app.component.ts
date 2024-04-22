import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet} from '@angular/router'
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { ClienteService } from './services/cliente.service';
import { CarritoService } from './services/carrito.service';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, RouterLink, NgOptimizedImage, CurrencyPipe]
})
export class AppComponent {
  constructor(
    public carritoService: CarritoService,
    public clientService: ClienteService,
    private router: Router
  ){}

  logOut(){
    this.clientService.isLoggedIn = false
    sessionStorage.clear()
    window.location.reload();
    this.router.navigate(['/']);
  }
}

