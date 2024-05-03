import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CarritoService } from '@services/carrito.service';
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

   selected:number = 0
   index: number = 0
   imageSelected:string = ""

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productoService: ProductosService,
    private carritoService: CarritoService
  ){}
 
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['refproducto'] 
      this.productoService.getUnicoProducto(id).subscribe(producto => {
        this.producto = {...producto[0], cantidad:this.cantidad}
        this.espera = false
        this.imageSelected = this.producto?.imagen[0]
        });
    
      });
    };
    
    onChange(event: Event) {
      const newValue = (event.target as HTMLInputElement).value;
      this.producto.cantidad = Number(newValue)
    }

    agregarAlCarrito(){
      this.carritoService.agregarAlCarrito(this.producto, this.producto?.cantidad)
      this.agregado = true
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
