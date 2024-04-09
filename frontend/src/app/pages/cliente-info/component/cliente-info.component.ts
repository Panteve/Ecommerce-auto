import { Component } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cliente-info',
  standalone: true,
  imports: [DatePipe,RouterLink],
  templateUrl: './cliente-info.component.html',
  styleUrl: './cliente-info.component.css'
})
export class ClienteInfoComponent {
 constructor(
  public clienteService: ClienteService
 ){}

}
