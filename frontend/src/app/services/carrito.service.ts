import { Injectable, afterNextRender } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  enCarrito: any[] = [];
  numeroEnCarrito:number = 0
  total:number = 0
  carritoJSON: any 
  numeroCarritoJSON: any = 0
  
  constructor() {
    afterNextRender(()=>{
      this.carritoJSON = sessionStorage.getItem('carrito');
      this.numeroCarritoJSON = sessionStorage.getItem('numeroCarrito')
      if(this.carritoJSON && this.numeroCarritoJSON){
        this.enCarrito = this.enCarrito = JSON.parse(this.carritoJSON);
        this.numeroEnCarrito = JSON.parse(this.numeroCarritoJSON);
      };
   
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
    const numeroCarritoJSON = JSON.stringify(this.numeroEnCarrito);
    const carritoJSON = JSON.stringify(this.enCarrito);
    sessionStorage.setItem('carrito',carritoJSON)
    sessionStorage.setItem('numeroCarrito',numeroCarritoJSON)
  }

}
