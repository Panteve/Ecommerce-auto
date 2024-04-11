import { AfterContentInit, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Router, RouterLink, RouterOutlet} from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgOptimizedImage],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements AfterContentInit{

constructor(
  private clienteService: ClienteService,
  private router: Router
){}

  ngAfterContentInit(): void {
    if(this.clienteService.isLoggedIn){
       this.router.navigate([''])
    }
   }
}
