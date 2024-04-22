import { HttpClient } from '@angular/common/http';
import { Injectable, afterNextRender} from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Cliente } from '../models/cliente'; 


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


  loginCliente(documento:null,contrasena:string):Observable<any>{
     return this.http.post(`${this.URL_API}/login`, { documento, contrasena })
      .pipe(
        tap((data: any) => {
          this.isLoggedIn = !!data.token 
          this.cliente = data.cliente;
          if(this.isLoggedIn === true){
            this.guardarSessionStorage(data.token)
          }
        })
      )
    }

   registerCliente(cliente:Cliente):Observable<any>{
     return this.http.post(`${this.URL_API}/cliente`, cliente)
    }
    private guardarSessionStorage(data:any){
      sessionStorage.setItem('logged',this.isLoggedIn.toString())
      sessionStorage.setItem('token',data)
      sessionStorage.setItem('info',JSON.stringify(this.cliente))
    }
    
  }

  

