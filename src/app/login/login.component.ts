import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../Model/User';
import { Exception } from '../exception/Exception';
import {Router} from "@angular/router";
import { Message } from '../Model/Message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService, Exception]
})
export class LoginComponent implements OnInit {

  message:Message;

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private _loginService: LoginService, private router: Router) {
    this.message = new Message("", "");
  }

  ngOnInit() {
  }

  signIn(){
    this.resetStatus();

    const user = this.getUser();
    this._loginService
    .signIn(user)
    .subscribe(
      res => {
        this.message.success = "Login Success!";
        localStorage.setItem('jwt', res.headers.get('x-auth-token'));
        this.router.navigate(['home']);
      }, 
      err => this.message.error = JSON.parse(err._body).message
    );
  }

  private getUser() {
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

    return new User(username, password, null);
  }

  private resetStatus() {
    this.message = new Message("", "");
  }
}
