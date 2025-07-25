import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient:HttpClient) { }




  getAllProducts(): Observable<any> {
    return this.httpClient.get<any>('https://ecommerce.routemisr.com/api/v1/products?limit=100');
  }
  getProductDetails(id:string):Observable<any>{
    return this.httpClient.get<any>(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  getAllCategeries():Observable<any>{
 return this.httpClient.get("https://ecommerce.routemisr.com/api/v1/categories")
  }
}
