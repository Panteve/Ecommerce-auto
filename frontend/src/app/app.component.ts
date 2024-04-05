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
    @Inject(DOCUMENT) private document: Document,
    public clientService: ClienteService
  ){

  const localStorage = this.document.defaultView?.localStorage;
    if (localStorage) {
      const storedValue = localStorage.getItem('clientService.isLoggedIn');
      this.clientService.isLoggedIn = storedValue !== null ? JSON.parse(storedValue) : false;
    } else {
      this.clientService.isLoggedIn = false;
    }
  } 



logout() {
  this.clientService.isLoggedIn = false;
  localStorage.setItem('clientService.isLoggedIn', JSON.stringify(this.clientService.isLoggedIn));
  }
}
