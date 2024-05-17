import { AfterContentInit, Component } from '@angular/core';
import { ClienteService } from '@services/cliente.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-cliente-info',
  standalone: true,
  imports: [DatePipe,RouterLink,NgxPaginationModule, CurrencyPipe],
  templateUrl: './cliente-info.component.html',
  styleUrl: './cliente-info.component.css'
})
export class ClienteInfoComponent implements AfterContentInit{
  public page!: number;
  
  cliente: any;
  
 constructor(
  public clienteService: ClienteService,
  private router: Router
 ){}

 ngAfterContentInit(): void {
  if(!this.clienteService.isLoggedIn){
     this.router.navigate([''])
  }
 }



}
