import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';


@Injectable()
export class LoginService {

  constructor(private http:Http) { }

  signUp(data) {
    const _url = '/api/user/signUp/' + data.username;
    this.http.post(_url, data).subscribe(
      res => console.log(res)
    );
  }
}
