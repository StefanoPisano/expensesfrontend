import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { Exception } from '../exception/Exception';
import "rxjs/Rx";


@Injectable()
export class LoginService {

  constructor(private http:Http, private exception:Exception) { }

  signIn(data) : Observable<any>{
    let loginRequest = JSON.stringify({username: data.username, password: data.password});
    let headers = new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'});
    const _url = '/api/login';

    return this.http.post(_url, loginRequest, {headers: headers})
    .map( res => res )
    .catch(this.exception.handleError);
  }
}
