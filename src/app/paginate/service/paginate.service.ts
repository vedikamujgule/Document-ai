import { Injectable } from '@angular/core';
import { Page } from '../Page';
import { Pageable } from '../pageable';

@Injectable({
  providedIn: 'root'
})
export class PaginateService {

  constructor() { }

  public getNextPage(page: Page<any>): Pageable {
    if(!page.last) {
      page.pageable.pageNumber = page.pageable.pageNumber+1;
    }
    return page.pageable;
  }

  public getPreviousPage(page: Page<any>): Pageable {
    if(!page.first) {
      page.pageable.pageNumber = page.pageable.pageNumber-1;
    }
    return page.pageable;
  }

  public getFirstPage(page: Page<any>): Pageable {
    if(!page.first) {
      page.pageable.pageNumber = Pageable.FIRST_PAGE_NUMBER;
      page.pageable.pageSize = Pageable.DEFAULT_PAGE_SIZE;
    }
    return page.pageable;
  }

  public getLastPage(page: Page<any>, pageNumber: number): Pageable {
    if(!page.last) {
      page.pageable.pageNumber = pageNumber-1;
      page.pageable.pageSize = Pageable.DEFAULT_PAGE_SIZE;
    }
    return page.pageable;
  }

  public getPageInNewSize(page: Page<any>, pageSize: number): Pageable {
    page.pageable.pageSize = pageSize;
    page.pageable.pageNumber = Pageable.FIRST_PAGE_NUMBER;
 
    return page.pageable;
  }
}
