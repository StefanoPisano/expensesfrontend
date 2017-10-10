import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';


@Injectable()
export class LoginService {

  constructor(private http:Http) { }

  signIn(data) : Observable<any>{
    const _url = '/api/user/signin/';
    return this.http.post(_url, data)
    .map( res => res )
    .catch(this.handleError);
  }

  private handleError(error:any) {
    return Observable.throw(error);
  }
}
