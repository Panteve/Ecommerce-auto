import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  readonly URL_API = environment.apiUrl ;

  isLoggedIn = true
  cliente: any
  pedidos: any
 
  constructor(private http: HttpClient) {}

  loginCliente(documento:null,contrasena:string):Observable<any>{
     return this.http.post(`${this.URL_API}login`, { documento, contrasena })
      .pipe(
        tap((data: any) => {
          this.isLoggedIn = data.isLoggedIn;
          this.cliente = data.cliente;
        })
      )
    }
  }

  

