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
minPrice: number | null = null;
maxPrice: number | null = null;
sortOrder: string = 'relevance';

  private productService = inject(ProductsService);

ngOnInit(): void {
  this.getProducts();
}

getProducts(): void {
  this.productService.getAllProducts(this.minPrice, this.maxPrice, this.sortOrder).subscribe({
    next:(response)=>{
      this.productList=response.data
    }
  })
}

applyFilters(): void {
  this.getProducts();
}

applySort(): void {
  this.getProducts();
}

}
