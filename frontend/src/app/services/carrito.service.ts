import { Injectable, afterNextRender } from '@angular/core';
import { ClienteService } from './cliente.service';
import { PedidoService } from './pedido.service';
import { Router } from '@angular/router';

 
@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  masDe10:boolean = false
  enCarrito: any[] = [];
  numeroEnCarrito:number = 0
  total:number = 0
  carritoJSON: any
  espera:boolean = true
  existeCarrito:boolean = false
  

  constructor(
    private router: Router,
    private clienteService: ClienteService,
    private pedidoService: PedidoService
  ){
    afterNextRender(()=>{
      this.carritoJSON = sessionStorage.getItem('carrito');
      this.existeCarrito = this.carritoJSON !== null && this.carritoJSON !== undefined;
      if(this.existeCarrito){
        this.enCarrito = this.enCarrito = JSON.parse(this.carritoJSON);
        this.espera = false
        this.existeCarrito = true
      }else{
        this.espera = false
      };
      this.cantidadCarrrito()
      this.calcularTotal()
    })

  }

  agregarAlCarrito(producto: any, cantidad:number, desdeCarrito?:boolean) {
    const index = this.enCarrito.findIndex((p: { _id: string; }) => p._id === producto._id)
    if(desdeCarrito){
      this.enCarrito[index].cantidad = cantidad
    }else{
      if(index !== -1){
        this.enCarrito[index].cantidad += cantidad
        if(this.enCarrito[index].cantidad >= 10){
          this.enCarrito[index].cantidad = 10     
          this.masDe10 = true
        }
      }else{
        this.enCarrito.push({ ...producto, cantidad })
      }
    }
    this.existeCarrito = true
    this.cantidadCarrrito()
    this.calcularTotal()
    this.guardarSessionStorage()
  }


  crearPedido(){
    if(this.clienteService.isLoggedIn){
     this.espera = true
    const pedido:Array<object> =  []
    this.enCarrito.forEach((producto)=>{
      pedido.push({producto: producto._id, cantidad: producto.cantidad})
    })
    this.pedidoService.crearPedido(pedido)
    .subscribe((res) => {
      this.espera = false
      this.clienteService.actualizarGeneracionPedido()
      this.existeCarrito = false
      this.pedidoService.pedidoExitoso = true
      setTimeout(()=>{
      this.router.navigate(['/pedido/'+res?.data]);
      }, 2000)
    });
    this.vaciarCarrito()
    }
  }

  eliminarDelCarrito(index: number) {
    this.enCarrito.splice(index, 1);
  }

  vaciarCarrito() {
    sessionStorage.removeItem('carrito')
    this.enCarrito = [];
    this.numeroEnCarrito = 0
    this.total = 0
  }

  calcularTotal(){
    this.total = this.enCarrito.reduce((total:number, producto)=> total + producto.precio * producto.cantidad, 0)
    return this.total
  }

  //Funciones privadas

  private cantidadCarrrito(){
    this.numeroEnCarrito = this.enCarrito.reduce((total: number, elem: { cantidad: any; }) => total + elem.cantidad, 0);
  }

  private guardarSessionStorage(){
    const carritoJSON = JSON.stringify(this.enCarrito);
    sessionStorage.setItem('carrito',carritoJSON)
  }

}
