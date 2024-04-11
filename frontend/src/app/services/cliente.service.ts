import { HttpClient } from '@angular/common/http';
import { Injectable, afterNextRender, OnInit} from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService{

  readonly URL_API = environment.apiUrl ;
  isLoggedIn:any 
  isLoggedInStr:any
  cliente: any
  clientInStr: any;
 
  constructor(private http: HttpClient) {
    afterNextRender(()=>{
      this.isLoggedInStr = sessionStorage.getItem('logged');
      this.isLoggedIn = this.isLoggedInStr === "true";
      this.clientInStr = sessionStorage.getItem('info')
      if(this.clientInStr){
        this.cliente = JSON.parse(this.clientInStr);
      }
    })
  }


  logOut(){
    this.isLoggedIn = false
    sessionStorage.clear()
  }

  loginCliente(documento:null,contrasena:string):Observable<any> {
     return this.http.post(`${this.URL_API}/login`, { documento, contrasena })
      .pipe(
        tap((data: any) => {
          this.isLoggedIn = data.token !== undefined || null 
          this.cliente = data.cliente;
          if(this.isLoggedIn !== undefined || null  ){
          sessionStorage.setItem('logged',this.isLoggedIn.toString())
          sessionStorage.setItem('token',data.token)
          sessionStorage.setItem('info',JSON.stringify(this.cliente))
          }
        })
      )
    }

    //registerCliente(Cliente:Cliente){
    //  return this.http.post(`${this.URL_API}/cliente`, Cliente)
    
    //}


  }

  

