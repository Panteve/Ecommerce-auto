import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, afterNextRender} from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '@environments/environment.development';
import { Cliente } from '@models/cliente'; 


@Injectable({
  providedIn: 'root'
})
export class ClienteService{

  readonly URL_API = environment.apiUrl ;
  isLoggedIn:any 
  cliente: any
  clientInStr: any;
  isLoggedInStr: any;
  token:string = ""
 
  constructor(private http: HttpClient) {
    afterNextRender(()=>{
      this.isLoggedInStr = sessionStorage.getItem('logged');
      this.isLoggedIn = this.isLoggedInStr === "true";
      this.clientInStr = sessionStorage.getItem('info')
      const token = sessionStorage.getItem('token')
      if(token){
        this.token = token
      }
      if(this.clientInStr){
        this.cliente = JSON.parse(this.clientInStr);
      }
    })
  }


  loginCliente(documento:any,contrasena:string):Observable<any>{
    return this.http.post(`${this.URL_API}/login`, { documento, contrasena })
      .pipe(
        tap((data: any) => {
          this.isLoggedIn = !!data.token 
          this.cliente = data.cliente;
          if(this.isLoggedIn === true){
            this.token = data.token
            this.guardarSessionStorage(data.token)
          }
        })
      )
      
    }

   registerCliente(cliente:Cliente):Observable<any>{
     return this.http.post(`${this.URL_API}/cliente`, cliente)
    }

    actualizarGeneracionPedido(){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
      this.http.get(`${this.URL_API}/cliente/${this.cliente.documento}`,{ headers: headers })
      .subscribe((res) => {
        this.cliente = res
        sessionStorage.setItem('info',JSON.stringify(this.cliente))
      })
    }



    private guardarSessionStorage(data:any){
      sessionStorage.setItem('logged',this.isLoggedIn.toString())
      sessionStorage.setItem('token',data)
      sessionStorage.setItem('info',JSON.stringify(this.cliente))
    }
    
  }

  

