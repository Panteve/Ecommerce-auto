import { Component, Inject,OnInit } from '@angular/core';
import { RouterLink, RouterOutlet} from '@angular/router'
import { DOCUMENT, NgOptimizedImage } from '@angular/common';
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
    this.clientService.isLoggedIn = false;
    }
}
