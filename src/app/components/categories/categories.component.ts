import { Component, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Category } from '../../interfaces/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
 private productService = inject(ProductsService);
 
  categoryList:Category[]=[]
ngOnInit(): void {
  this.productService.getAllCategeries().subscribe({
    next:(response)=>{
      this.categoryList=response.data
    }
  })
}
}
