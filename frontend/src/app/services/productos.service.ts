import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { environment } from '@environments/environment.development';
import { ClienteService } from './cliente.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  readonly URL_API = environment.apiUrl ;
  producto:any
  productoGuardado:any

  constructor(
    private http: HttpClient,
    private clienteService: ClienteService
  ){}

  getProductos():Observable<any>{
    return this.http.get(`${this.URL_API}/producto`)
  }

  getUnicoProducto(id:any): Observable<any> {
    if (!this.producto) {
      return this.http.get(`${this.URL_API}/producto/${id}`).pipe(
        tap(response => {
          this.producto = response;
        })
      );
    } else {
      return of(this.producto);
    }
  }

  getProductosEspecificos(productos:Array<string>):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.clienteService.token 
    });
    return this.http.get(`${this.URL_API}/producto/varios`, { 
      headers: headers,
      params: new HttpParams().set('refproducto', productos.join(',')) 
    });
  }

  
  
}
