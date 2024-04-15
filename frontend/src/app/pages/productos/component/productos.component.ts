import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { ProductosService } from '../../../services/productos.service';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

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

  constructor(private productoService: ProductosService){}


  ngOnInit(): void {
    this.productoService.getProductos()
    .subscribe(response =>{
      this.espera = false
      this.productos = response
    })
  }

  
}
