import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../../services/productos.service';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../../services/carrito.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, CurrencyPipe],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {
  espera = true
  productos:any
  numbers = 4

  constructor(
    private productoService: ProductosService,
    private carritoService: CarritoService
  ){}


  ngOnInit(): void {
    this.productoService.getProductos()
    .subscribe(response =>{
      this.espera = false
      this.productos = response
    })
  }

  agregarCarrito(item:any){
    this.carritoService.agregarAlCarrito(item)
  }

  
}
