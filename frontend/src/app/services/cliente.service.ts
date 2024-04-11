import { HttpClient } from '@angular/common/http';
import { Injectable, afterNextRender } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AnyARecord } from 'node:dns';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  readonly URL_API = environment.apiUrl ;
  isLoggedIn:any
  isLoggedInStr:any
  cliente: any
  clientInStr: any;
 
  constructor(private http: HttpClient) {
    afterNextRender(()=>{
      this.isLoggedInStr = localStorage.getItem('logged');
      this.isLoggedIn = this.isLoggedInStr === "true";
      this.clientInStr = localStorage.getItem('info')
      if(this.clientInStr){
        this.cliente = JSON.parse(this.clientInStr);
      }
    })
  }
  loginCliente(documento:null,contrasena:string):Observable<any> {
     return this.http.post(`${this.URL_API}login`, { documento, contrasena })
      .pipe(
        tap((data: any) => {
          this.isLoggedIn = data.isLoggedIn;
          this.cliente = data.cliente;
          console.log(this.cliente)
          localStorage.setItem('logged',this.isLoggedIn.toString())
          localStorage.setItem('info',JSON.stringify(this.cliente))
        })
      )
    }
  }

  

