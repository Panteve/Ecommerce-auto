import { Component } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-cliente-info',
  standalone: true,
  imports: [],
  templateUrl: './cliente-info.component.html',
  styleUrl: './cliente-info.component.css'
})
export class ClienteInfoComponent {
 constructor(
  public clienteService: ClienteService
 ){}
}
