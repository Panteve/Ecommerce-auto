import { Injectable, afterNextRender } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  enCarrito: any = [];
  numeroEnCarrito:any
  total:any
  
  constructor() {
    afterNextRender(()=>{
      const carritoJSON = sessionStorage.getItem('carrito');
  if (carritoJSON) {
    this.enCarrito = JSON.parse(carritoJSON);

    this.numeroEnCarrito = this.enCarrito.length;
  }
    })
  }

  agregarAlCarrito(producto: any) {
    this.enCarrito.push(producto);
    this.numeroEnCarrito = this.enCarrito.length
    const carritoJSON = JSON.stringify(this.enCarrito);
    sessionStorage.setItem('carrito',carritoJSON)
  }

  eliminarDelCarrito(index: number) {
    this.enCarrito.splice(index, 1);
  }

  vaciarCarrito() {
    this.enCarrito = [];
  }


}
