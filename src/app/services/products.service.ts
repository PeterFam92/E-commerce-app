import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient:HttpClient) { }




  getAllProducts(minPrice: number | null, maxPrice: number | null, sortOrder: string): Observable<any> {
    let url = 'https://ecommerce.routemisr.com/api/v1/products?limit=100';

    if (minPrice !== null) {
      url += `&price[gte]=${minPrice}`;
    }
    if (maxPrice !== null) {
      url += `&price[lte]=${maxPrice}`;
    }

    if (sortOrder === 'priceAsc') {
      url += '&sort=price';
    } else if (sortOrder === 'priceDesc') {
      url += '&sort=-price';
    }

    return this.httpClient.get<any>(url);
  }
  getProductDetails(id:string):Observable<any>{
    return this.httpClient.get<any>(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  getAllCategeries():Observable<any>{
 return this.httpClient.get("https://ecommerce.routemisr.com/api/v1/categories")
  }
  getAllBrands():Observable<any>{
 return this.httpClient.get("https://ecommerce.routemisr.com/api/v1/brands")
}
}
