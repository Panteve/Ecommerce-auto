import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service'
import { FormsModule } from '@angular/forms';



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
  ) { }

  onSubmit() {
    this.clienteService.loginCliente(this.cliente.documento, this.cliente.contrasena)
    .subscribe( response => {
      this.data = response
      this.clienteService.isLoggedIn = this.data.isLoggedIn

    }, error => {
      console.error(error);
    });
  }

}
