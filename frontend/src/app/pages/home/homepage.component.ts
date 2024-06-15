import { Component, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common'
import { ClienteService } from '@services/cliente.service';
import { RouterLink } from '@angular/router';
import { ProductosService } from '@services/productos.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit{
  
  isLogged:any
  productos:any[] = []

  constructor(
    public clienteService: ClienteService,
    private productosService: ProductosService
  ){}

  ngOnInit(): void {
    this.isLogged = this.clienteService.isLoggedIn
    this.productosService.getProductos().subscribe(res => {
      this.productos = res
    })
  }
  
  
  

}


