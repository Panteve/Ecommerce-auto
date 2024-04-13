import { AfterContentInit, Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service'
import { FormsModule } from '@angular/forms';


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
  response: boolean = false
  
  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) { }

  ngAfterContentInit(): void {
   if(this.clienteService.isLoggedIn){
      this.router.navigate([''])
   }
  }

  ngOnDestroy(): void {
    this.response = false
  }


  onSubmit() {
    this.clienteService.loginCliente(this.cliente.documento, this.cliente.contrasena)
    .subscribe(response => {
      if(response.status){
        this.response = true
        this.cliente.documento = null;
        this.cliente.contrasena = '';
      }else{
      this.router.navigate(['/']);
    }
    }, error => {
      console.error(error);
    });
  }

}
