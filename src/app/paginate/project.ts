import { Page } from "./Page";
import { Pageable } from "./pageable"
import { Sort } from "./sort";

export class Project {
    
    pageable:Page<Object>;
    last : boolean;
    totalElements: number;
    totalPages: number;
    first: boolean;
    //sort : Sort
    numberOfElements: number;
    size: number;
    //number: number;
  }