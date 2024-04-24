import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  readonly URL_API = environment.apiUrl ;

  constructor(private http: HttpClient){}

  getProductos():Observable<any>{
    return this.http.get(`${this.URL_API}/producto`)
  }

  getUnicoProducto(id:any):Observable<any>{
    return this.http.get(`${this.URL_API}/producto/${id}`)
  }

}
