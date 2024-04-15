import { AfterContentInit, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common'
import { ClienteService } from '../../../services/cliente.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements AfterContentInit{
  
  isLogged:any

  constructor(
    public clientService: ClienteService
  ){}
  
  ngAfterContentInit(): void {
    this.isLogged = this.clientService.isLoggedIn
  }
  

}


