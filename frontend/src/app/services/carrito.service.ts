import { Injectable, afterNextRender } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  enCarrito: any[] = [];
  numeroEnCarrito:number = 0
  total:number = 0
  carritoJSON: any 
  
  constructor() {
    afterNextRender(()=>{
      this.carritoJSON = sessionStorage.getItem('carrito');
      if(this.carritoJSON ){
        this.enCarrito = this.enCarrito = JSON.parse(this.carritoJSON);
      };
      this.cantidadCarrrito()
      this.calcularTotal()
    })
  }

  agregarAlCarrito(producto: any, cantidad:number) {
    const index = this.enCarrito.findIndex((p: { _id: string; }) => p._id === producto._id)
    if(index !== -1){
      this.enCarrito[index].cantidad += cantidad
    }else{
      this.enCarrito.push({ ...producto, cantidad })
    }
    this.cantidadCarrrito()
    this.calcularTotal()
    this.guardarSessionStorage()
  }



  eliminarDelCarrito(index: number) {
    this.enCarrito.splice(index, 1);
  }

  vaciarCarrito() {
    this.enCarrito = [];
  }



  private cantidadCarrrito(){
    this.numeroEnCarrito = this.enCarrito.reduce((total: number, elem: { cantidad: any; }) => total + elem.cantidad, 0);
  }

  private calcularTotal(){
    this.total = this.enCarrito.reduce((total:number, producto)=> total + producto.precio * producto.cantidad, 0)
  }


  private guardarSessionStorage(){
    const carritoJSON = JSON.stringify(this.enCarrito);
    sessionStorage.setItem('carrito',carritoJSON)
  }

}
