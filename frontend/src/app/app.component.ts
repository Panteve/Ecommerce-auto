import { Component, HostListener } from '@angular/core';
import { Router, RouterLink, RouterOutlet} from '@angular/router'
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
    public clientService: ClienteService,
    private router: Router
  ){}
  
  logOut(){
    this.clientService.isLoggedIn = false
    sessionStorage.clear()
    this.router.navigate(['/']);
  }
}

