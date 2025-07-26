import { Component, inject } from '@angular/core';
import { Brand } from '../../interfaces/brand';
import { ProductsService } from '../../services/products.service';


@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent {
  private productService = inject(ProductsService);
  brandList:Brand[]=[]
ngOnInit(): void {
  this.productService.getAllBrands().subscribe({
    next:(response)=>{
      this.brandList=response.data
    }
  })
}
}

