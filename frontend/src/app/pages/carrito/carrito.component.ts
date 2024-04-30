import { Component } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, NgOptimizedImage],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {

  constructor(public carritoService: CarritoService) { }

  onChange(event: Event, producto: any) {
    const newValue = (event.target as HTMLInputElement).value;
    this.carritoService.agregarAlCarrito(producto, Number(newValue), true)
  }


  


}
