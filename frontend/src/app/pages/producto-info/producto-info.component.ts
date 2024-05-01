import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '@services/productos.service';

@Component({
  selector: 'app-producto-info',
  standalone: true,
  imports: [NgClass],
  templateUrl: './producto-info.component.html',
  styleUrl: './producto-info.component.css'
})
export class ProductoInfoComponent {
   producto:any
   espera:boolean = true
   selected:number = 0
   index: number = 0
   imageSelected:string = ""


  constructor(
    private route: ActivatedRoute,
    private productoInfoService: ProductosService
  ){
    
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['refproducto'] 
      this.productoInfoService.getUnicoProducto(id)
        .subscribe(producto => {
          this.producto = producto[0]
          this.espera = false
          this.imageSelected = this.producto?.imagen[0]
      });
    });
  }
  seleccionado(imagen:string){
    this.index = this.producto.imagen.indexOf(imagen)
    this.imageSelected = imagen
    if (this.index !== -1) {
      this.selected = this.index
    }
    
  }

}
