import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';


@Injectable()
export class RegisterService {

  constructor(private http:Http) {   }


  signUp(data) : Observable<any>{
    const _url = '/api/user/signup/';

    return this.http.post(_url, data)
      .map(res => res)
      .catch(this.handleError);
  }

  private handleError(error:any) {
    return Observable.throw(error);
  }
}
