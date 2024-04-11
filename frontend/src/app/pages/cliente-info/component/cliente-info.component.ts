import { Component, afterNextRender } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-cliente-info',
  standalone: true,
  imports: [DatePipe,RouterLink,NgxPaginationModule ],
  templateUrl: './cliente-info.component.html',
  styleUrl: './cliente-info.component.css'
})
export class ClienteInfoComponent {
  public page!: number;
  
  cliente: any;
  
 constructor(
  public clienteService: ClienteService
 ){}

}
