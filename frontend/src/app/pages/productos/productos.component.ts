import { Component, OnInit } from '@angular/core';
import { ProductosService } from '@services/productos.service';
import { CurrencyPipe, NgClass, NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CarritoService } from '@services/carrito.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, CurrencyPipe, NgClass],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {
  
  
  masDe10:boolean = false
  agregado:boolean = false
  espera = true
  productos:any
  numbers = 4

  constructor(
    private router: Router,
    private productoService: ProductosService,
    private carritoService: CarritoService
  ){}


  ngOnInit(): void {
    this.productoService.getProductos()
    .subscribe(res =>{
      this.espera = false 
      this.productos = res
    })
  }

  agregarCarrito(producto:any, cantidad:number){
    this.carritoService.agregarAlCarrito(producto, cantidad)
    if(this.carritoService.masDe10){
      this.masDe10 = true
      setTimeout(() => {
        this.masDe10 = false;
      }, 4000);
    }else{
      this.agregado = true
      setTimeout(() => {
        this.agregado = false;
      }, 4000);
    }

  }

  navegarAlCarrito() {
    this.router.navigate(['/carrito']);
  }

}
