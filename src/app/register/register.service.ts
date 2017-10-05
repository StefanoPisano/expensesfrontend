import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';


@Injectable()
export class RegisterService {

  constructor(private http:Http) { }

  signUp(data) {
    const _url = '/api/user/signup/';
    this.http.post(_url, data).subscribe(
      res => console.log(res)
    );
  }
}
