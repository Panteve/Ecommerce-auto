import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../../services/productos.service';

@Component({
  selector: 'app-producto-info',
  standalone: true,
  imports: [],
  templateUrl: './producto-info.component.html',
  styleUrl: './producto-info.component.css'
})
export class ProductoInfoComponent {
   producto:any

  constructor(
    private route: ActivatedRoute,
    private productoInfoService: ProductosService
  ){}


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['refproducto'] 
      this.productoInfoService.getUnicoProducto(id).subscribe(producto => {
        this.producto = producto
        console.log(this.producto)
      });
    });
  }

}
