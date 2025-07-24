import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Category } from '../../interfaces/category';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-categories-slider',
  templateUrl: './categories-slider.component.html',
  styleUrl: './categories-slider.component.css'
})
export class CategoriesSliderComponent  implements OnInit {
   customOptions: OwlOptions = {
      loop: true,
      mouseDrag: false,
      touchDrag: false,
      pullDrag: false,
      dots: false,
      navSpeed: 700,
       autoplay:true,
    autoplayTimeout:1000,
    autoplayHoverPause:true,
      navText: ['', ''],
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 2
        },
        740: {
          items: 3
        },
        940: {
          items: 7
        }
      },
      nav: true
    }
productService =inject(ProductsService);
categoriesList:Category[]=[]
ngOnInit(): void {
  this.productService.getAllCategeries().subscribe({
    next:(response)=>{this.categoriesList=response.data}
  })
}
}
