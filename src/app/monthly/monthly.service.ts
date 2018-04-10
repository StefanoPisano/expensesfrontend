import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { Exception } from '../exception/Exception';
import "rxjs/Rx";

@Injectable()
export class MonthlyService {

  constructor(private http:Http, private exception:Exception) { }

  saveExpenses(data) : Observable<any> {
    const _url = '/api/monthly';

    return this.http
    .post(_url, data, {headers: this.prepareHeaders()})
    .map( res => res )
    .catch(this.exception.handleError);
  }

  getExpenses() {
    const _url = '/api/monthly';

    return this.http
    .get(_url, {headers: this.prepareHeaders()})
    .map(res => res)
    .catch(this.exception.handleError);
  }

  removeExpense(id:Number) : Observable<any> {
    const _url = "api/monthly/" + id;

    return this.http.delete(_url, {headers: this.prepareHeaders()})
    .map( res => res )
    .catch(this.exception.handleError);    
  }

  getRemaining() {
    const _url = '/api/budget/remaining';
    
    return this.http
    .get(_url, {headers: this.prepareHeaders()})
    .map(res => res)
    .catch(this.exception.handleError);
  }

  getCategories() : Observable<any> {
    const _url = '/api/monthly/categories';

    return this.http
    .get(_url, {headers: this.prepareHeaders()})
    .map( res => res )
    .catch(this.exception.handleError);
  }

  prepareHeaders(){
    return new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-auth-token': localStorage.getItem('jwt')
    });
  }
}
