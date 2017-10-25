import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { Exception } from '../exception/Exception';
import "rxjs/Rx";

@Injectable()
export class ProfileService {

  constructor(private http:Http, private exception:Exception) { }

  loadData() : Observable<any> {
    const _url = '/api/user';

    return this.http.get(_url, {headers: this.prepareHeaders()})
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
