import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Exception } from '../exception/Exception';

@Injectable()
export class RegisterService {

  constructor(private http:Http, private exception:Exception) {   }

  signUp(data) : Observable<any>{
    const _url = '/api/user/signup/';

    return this.http
    .post(_url, data)
      .map(res => res)
      .catch(this.exception.handleError);
  }
}
