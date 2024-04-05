import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  readonly URL_API = 'http://localhost:3000/api/';

  isLoggedIn = false;

  constructor(private http: HttpClient) {}

  loginCliente(documento:null,contrasena:string){
    return this.http.post(`${this.URL_API}/login`,{documento, contrasena} )
  }
}
