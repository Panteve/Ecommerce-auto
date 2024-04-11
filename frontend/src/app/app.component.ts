import { Component } from '@angular/core';
import { RouterLink, RouterOutlet} from '@angular/router'
import { NgOptimizedImage } from '@angular/common';
import { ClienteService } from './services/cliente.service';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, RouterLink, NgOptimizedImage]
})
export class AppComponent {

  constructor(
    public clientService: ClienteService
  ){}

  logout() {
    localStorage.removeItem('logged')
    localStorage.removeItem('info')
    this.clientService.isLoggedIn = false;
    }
}
