import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common'
import { ClienteService } from '../../../services/cliente.service';
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  @Input () nombre= ''
  constructor(
    public clientService: ClienteService
  ){}

}
