import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { Exception } from '../exception/Exception';
import "rxjs/Rx";

@Injectable()
export class DesireService {

  constructor(private http:Http, private exception:Exception) { }

  getDesire() : Observable<any> {
    const _url = "api/desire";

    return this.http.get(_url, {headers: this.prepareHeaders()})
    .map( res => res )
    .catch(this.exception.handleError);    
  }

  createDesire(data) : Observable<any> {
    const _url = "api/desire";

    return this.http.post(_url, data, {headers: this.prepareHeaders()})
    .map(res => res)
    .catch(this.exception.handleError);
  }

  moveDesire(id) : Observable<any> {
    const _url = "api/desire/" + id ;
    
    return this.http.post(_url, {headers: this.prepareHeaders()})
    .map( res => res )
    .catch(this.exception.handleError);    
  }

  removeDesire(id:Number) : Observable<any> {
    const _url = "api/desire/" + id;

    return this.http.delete(_url, {headers: this.prepareHeaders()})
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
