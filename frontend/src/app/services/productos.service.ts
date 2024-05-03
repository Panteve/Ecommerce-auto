import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { environment } from '@environments/environment.development';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  readonly URL_API = environment.apiUrl ;
  producto:any
  productoGuardado:any

  constructor(private http: HttpClient){}

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

  
  
}
