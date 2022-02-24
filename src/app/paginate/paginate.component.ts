import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Page } from './Page';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss']
})
export class PaginateComponent implements OnInit {

  @Input() page: Page<any>;
  @Output() nextPageEvent = new EventEmitter();
  @Output() previousPageEvent = new EventEmitter();
  @Output() firstPageEvent = new EventEmitter();
  @Output() lastPageEvent = new EventEmitter();
  @Output() pageSizeEvent: EventEmitter<number> = new EventEmitter<number>();
 
  constructor() { }
 
  ngOnInit() {
  }
 
  nextPage(): void {
    this.nextPageEvent.emit(null);
  }
 
  previousPage(): void {
    this.previousPageEvent.emit(null);
  }
 
  updatePageSize(pageSize: number): void {
    this.pageSizeEvent.emit(pageSize);
  }

  firstPage(): void {
    this.firstPageEvent.emit(null);
  }

  lastPage(): void {
    this.lastPageEvent.emit(null);
  }



}
