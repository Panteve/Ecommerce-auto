import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment.development';
import { ClienteService } from './cliente.service';

interface Respuesta {
  data:string;
  status: string;
}

  

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  readonly URL_API = environment.apiUrl;
  pedidoExitoso: boolean = false

  constructor(private http: HttpClient, private clienteService: ClienteService) { }

  unicoPedido(id: string):Observable<object> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.clienteService.token 
    });
    return this.http.get(`${this.URL_API}/pedido/${id}`,{ headers: headers })     
  }

  crearPedido(pedido:Array<object>):Observable<Respuesta> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.clienteService.token 
    });
    return this.http.post<Respuesta>(`${environment.apiUrl}/pedido`, { documentoDueño: this.clienteService.cliente.documento, productos: pedido }, { headers: headers })
 
  }
}

