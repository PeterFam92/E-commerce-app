import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

productsService = inject(ProductsService)
productsList:Product[]=[]
ngOnInit(): void {
  this.productsService.getAllProducts(null, null, 'relevance').subscribe({
    next:(response)=>{this.productsList=response.data;},
   
  })




}



}
