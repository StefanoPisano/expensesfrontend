import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../Model/User';
import {RegisterService} from './register.service';
import { Exception } from '../exception/Exception';
import { Message } from '../Model/Message';

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

  message : Message;

  constructor(private _registerService: RegisterService) {
    this.message = new Message("", "");
  }
  
  ngOnInit(): void{
  }

  signUp() {
    this.resetStatus();

    if(!this.registerForm.valid) {
      this.message.error = "Error! Please remember that: username must be at least 3 characters, password at least 6";      
    }

    this._registerService.signUp(this.getUser())
    .subscribe(
      res => this.message.success= "Registration success!",
      err => this.message.error = JSON.parse(err._body).message
    );
  }

  private getUser() {
    const username = this.registerForm.get('username').value;
    const password = this.registerForm.get('password').value;
    const email = this.registerForm.get('email').value;

    return new User(username, password, email);
  }

  private resetStatus() {
    this.message = new Message("", "");
  }
}
