import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
productList : Product[]=[]
searchTerm : string =''

  private productService = inject(ProductsService);

ngOnInit(): void {
  this.productService.getAllProducts().subscribe({
    next:(response)=>{console.log(response);
      this.productList=response.data
    }
  })
}
}
