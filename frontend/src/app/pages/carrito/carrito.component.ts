import { Component } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { CurrencyPipe, NgClass, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, NgOptimizedImage, NgClass],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  iva:number = 0
  descuento:number = 0
  total:number = 0  

  constructor(public carritoService: CarritoService) { 
    
  }

  onChange(event: Event, producto: any) {
    const newValue = (event.target as HTMLInputElement).value;
    this.carritoService.agregarAlCarrito(producto, Number(newValue), true)
  }

  subTotal() {
    const subtotal = this.carritoService.total
    this.iva = subtotal * 0.19
    this.descuento = subtotal * 0.30
    this.total = subtotal + this.iva - this.descuento
    return this.carritoService.total
  }


  


}
