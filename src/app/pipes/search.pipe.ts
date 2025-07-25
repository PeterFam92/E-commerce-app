import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(list:Product[] , term:string='') {
    return list.filter((product)=> product.title.toLowerCase().includes(term.toLowerCase())) ;
  }

}
