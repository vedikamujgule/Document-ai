import  { Sort } from './sort';
import  { Pageable } from './pageable';
 
export class Page<T> {
  content: Array<T>;
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalRecords: number;
  first: boolean;
  //numberOfElements: number;
  //size: number;
  //number: number;
 
  public constructor() {
    this.pageable = new Pageable();
  }
}