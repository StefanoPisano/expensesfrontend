import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../Model/User';
import {RegisterService} from './register.service';
import { Exception } from '../exception/Exception';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RegisterService, Exception]
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern("[^ @]*@[^ @]*")]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  statusCode : number = 0;
  errorMessage : string;

  signUp() {
    this.resetStatus();
    debugger;
    if(this.registerForm.valid) {
    let _result = this.
                  _registerService
                  .signUp(this.getUser())
                        .subscribe(
                          res => this.statusCode = res.status,
                          err => {
                            this.statusCode = JSON.parse(err._body).status
                            this.errorMessage = JSON.parse(err._body).message
                          }
                        );
                      }
                      else {
                        this.statusCode = -1;
                        this.errorMessage = "Error! Please remember that: username must be at least 3 characters, password at least 6"
                      }
  }

  private getUser() {
    const username = this.registerForm.get('username').value;
    const password = this.registerForm.get('password').value;
    const email = this.registerForm.get('email').value;

    return new User(username, password, email);
  }

  private resetStatus() {
    this.statusCode = 0;
    this.errorMessage = "";
  }

  constructor(private _registerService: RegisterService) { }

  ngOnInit(): void{
  }
}
