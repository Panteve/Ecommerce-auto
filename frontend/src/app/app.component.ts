import { Component } from '@angular/core';
import { RouterLink, RouterOutlet} from '@angular/router'
import { CurrencyPipe, NgClass, NgOptimizedImage } from '@angular/common';
import { ClienteService } from '@services/cliente.service';
import { CarritoService } from '@services/carrito.service';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, RouterLink, NgOptimizedImage, CurrencyPipe, NgClass]
})
export class AppComponent {
  constructor(
    public carritoService: CarritoService,
    public clientService: ClienteService,
  ){}

  logOut(){
    this.clientService.isLoggedIn = false
    sessionStorage.removeItem('info')
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('logged')
    window.location.reload()
  }
}

