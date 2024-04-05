import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service'
import { FormsModule } from '@angular/forms';

declare var M: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{

  cliente = { documento: null, contrasena: '' };
  data: any
  
  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) { }

  onSubmit() {
    this.clienteService.loginCliente(this.cliente.documento, this.cliente.contrasena)
    .subscribe( response => {
      this.data = response
      this.clienteService.isLoggedIn = this.data.isLoggedIn
      this.router.navigate(['/']);
      
    }, error => {
      console.error(error);
    });
  }

}
