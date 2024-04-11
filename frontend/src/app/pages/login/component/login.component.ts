import { AfterContentInit, Component, OnInit } from '@angular/core';
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
export class LoginComponent implements AfterContentInit{

  cliente = { documento: null, contrasena: '' };
  data: any
  
  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) { }

  ngAfterContentInit(): void {
   if(this.clienteService.isLoggedIn){
      this.router.navigate([''])
   }
  }


  onSubmit() {
    this.clienteService.loginCliente(this.cliente.documento, this.cliente.contrasena)
    .subscribe( response => {
      this.router.navigate(['/']);
    }, error => {
      console.error(error);
    });
  }

}
