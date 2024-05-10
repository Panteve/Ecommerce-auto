import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment.development';
import { ClienteService } from './cliente.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  readonly URL_API = environment.apiUrl ;

  constructor(private http: HttpClient, private clienteService: ClienteService) { }

  unicoPedido(id: any):Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.clienteService.token 
    });
    return this.http.get(`${this.URL_API}/pedido/${id}`,{ headers: headers })     
  }

  crearPedido(pedido:Array<object>){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.clienteService.token 
    });
    this.http.post(`${environment.apiUrl}/pedido`, { documentoDueño: this.clienteService.cliente.documento, productos: pedido }, { headers: headers })
      .subscribe((res) => {
        this.clienteService.actualizarGeneracionPedido()
    });
  }
}

