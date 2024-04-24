import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  readonly URL_API = environment.apiUrl ;

  constructor(private http: HttpClient) { }

  unicoPedido(id: any):Observable<any> {
    return this.http.get(`${this.URL_API}/pedido/${id}`)     
  }
}

