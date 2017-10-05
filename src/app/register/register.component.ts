import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../Model/User';
import {RegisterService} from './register.service'

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  signUp() {
    const username = this.registerForm.get('username').value;
    const password = this.registerForm.get('password').value;
    const email = this.registerForm.get('email').value;

    const user = new User(username, password, email);

    console.log(user.username + ' ' + user.password + ' ' + user.email);

    this._registerService.signUp(user);
  }

  constructor(private _registerService: RegisterService) { }

  ngOnInit(): void{
  }


}
