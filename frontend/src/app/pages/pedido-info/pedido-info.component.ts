import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PedidoService } from '@services/pedido.service';
import { CurrencyPipe, DatePipe, NgOptimizedImage } from '@angular/common';
import { ClienteService } from '@services/cliente.service';
import { ProductosService } from '@services/productos.service';


@Component({
  selector: 'app-pedido-info',
  standalone: true,
  imports: [DatePipe,CurrencyPipe, NgOptimizedImage, RouterLink],
  templateUrl: './pedido-info.component.html',
  styleUrl: './pedido-info.component.css'
})
export class PedidoInfoComponent {
  total = 1000000
  pedido: any;
  productos: any[] = []
  espera: boolean = true;
  logueado: boolean = this.clienteService.isLoggedIn;

  
  constructor(
    private productoService:ProductosService,
    private clienteService:ClienteService ,
    private route: ActivatedRoute,
    public pedidoService: PedidoService
  ){
    this.route.params.subscribe(params => {
      let id = params['refpedido'] 
      this.pedidoService.unicoPedido(id).subscribe(pedido => {
        this.pedido = pedido
        const productosRefs = this.pedido.productos.map((pedidoProducto: { producto: any; }) => pedidoProducto.producto);
        this.productoService.getProductosEspecificos(productosRefs)
        .subscribe(productos => {
          productos.forEach((producto: { _id: string; }) => {
            const pedidoProducto = this.pedido.productos.find((pedidoProducto: { producto: string; }) => pedidoProducto.producto === producto._id);
            const cantidad = pedidoProducto.cantidad;
            this.productos.push({...producto, cantidad});
          });
          this.espera = false
        })     
      });
    });
  }

  ngOnInit(): void {
    
  }

}

