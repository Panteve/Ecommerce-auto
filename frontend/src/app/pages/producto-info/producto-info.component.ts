import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CarritoService } from '@services/carrito.service';
import { ClienteService } from '@services/cliente.service';
import { ProductosService } from '@services/productos.service';

@Component({
  selector: 'app-producto-info',
  standalone: true,
  imports: [NgClass, CurrencyPipe, RouterLink],
  templateUrl: './producto-info.component.html',
  styleUrl: './producto-info.component.css'
})
export class ProductoInfoComponent implements OnInit{
   producto:any
   cantidad:number = 1

   agregado:boolean = false
   espera:boolean = true
   masDe10:boolean = false
   logueado: boolean = this.clienteService.isLoggedIn;

   selected:number = 0
   index: number = 0
   imageSelected:string = ""

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productoService: ProductosService,
    private carritoService: CarritoService,
    private clienteService: ClienteService
  ){}
 
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['refproducto'] 
      this.productoService.getUnicoProducto(id).subscribe(producto => {
        this.producto = {...producto[0], cantidad:this.cantidad}
        this.imageSelected = this.producto?.imagen[0]
        this.espera = false
        });
    
      });
    };
    
    onChange(event: Event) {
      const newValue = (event.target as HTMLInputElement).value;
      this.producto.cantidad = Number(newValue)
    }

    agregarAlCarrito(){
      this.carritoService.agregarAlCarrito(this.producto, this.producto?.cantidad)
      if(this.carritoService.masDe10){
        this.masDe10 = true
        setTimeout(() => {
          this.masDe10 = false;
        }, 4000);
      }else{
        this.agregado = true
        setTimeout(() => {
          this.agregado = false;
        }, 4000);
      }
      this.producto.cantidad = 1
    }
  
    seleccionado(imagen:string){
      this.index = this.producto.imagen.indexOf(imagen)
      this.imageSelected = imagen
      if (this.index !== -1) {
        this.selected = this.index
      }
    }
    navegarAlCarrito() {
      this.router.navigate(['/carrito']);
    }
  

}
