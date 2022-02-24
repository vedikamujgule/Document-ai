import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(public httpClient: HttpClient) { }
  getDeals(): Observable<any> {
    return this.httpClient.get('http://localhost:4200/deals');
  }
}
