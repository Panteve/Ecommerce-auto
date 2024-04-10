import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PedidoService } from '../../../services/pedido.service';
import { CurrencyPipe, DatePipe } from '@angular/common';


@Component({
  selector: 'app-pedido-info',
  standalone: true,
  imports: [DatePipe,CurrencyPipe],
  templateUrl: './pedido-info.component.html',
  styleUrl: './pedido-info.component.css'
})
export class PedidoInfoComponent {
  total = 1000000
  pedido: any;
  
  constructor(
    private route: ActivatedRoute,
    public pedidoService: PedidoService
  ){}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['refpedido'] 
      this.pedidoService.unicoPedido(id).subscribe(pedido => {
        this.pedido = pedido
        console.log(pedido)
      });
    });
  }

}

