import { AfterContentInit, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Router, RouterLink, RouterOutlet} from '@angular/router';
import { Cliente } from '@models/cliente';
import { ClienteService } from '@services/cliente.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgOptimizedImage, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements AfterContentInit{
  
  registerForm: FormGroup;
  clienteExiste: boolean = false
  invalidForm: boolean = false
  responseError: string = ''
 

constructor(
  private clienteService: ClienteService,
  private router: Router,
  private formBuilder: FormBuilder
){
  this.registerForm = this.formBuilder.group({
    nombre: ['', Validators.required],
    documento: [null, [Validators.required, Validators.min(5)]],
    correo: ['', [Validators.required, Validators.email]],
    ciudad: ['', Validators.required],
    direccion: ['', Validators.required],
    telefono: [null, [Validators.required, Validators.min(8)]],
    contrasena: ["", Validators.required]
  });
  
} 
  ngOnDestroy():void{
    this.clienteExiste = false
    this.invalidForm = false
  }

  ngAfterContentInit(): void {
    if(this.clienteService.isLoggedIn){
       this.router.navigate([''])
    }
   }

  onSubmit(){
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      const cliente = new Cliente(formData.nombre, formData.documento, formData.correo, formData.ciudad, formData.direccion, formData.telefono, formData.contrasena);
      this.clienteService.registerCliente(cliente)
      .subscribe( response =>{
        if(response.error === 'Existe'){
          this.responseError = response.message
          this.clienteExiste = true
        }else{
          this.clienteService.loginCliente(formData.documento, formData.contrasena).subscribe(response => {
            this.router.navigate(['/'])
          })
        }
      }) 
    }else{
      this.invalidForm = true

    }
  }
}


