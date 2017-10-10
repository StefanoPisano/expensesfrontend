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

  statusCode : number = 0;
  errorMessage : string;

  signUp() {
    this.resetStatus();

    let _result = this._registerService.signUp(this.getUser())
                        .subscribe(
                          res => this.statusCode = res.status,
                          err => {
                            this.statusCode = JSON.parse(err._body).status
                            this.errorMessage = JSON.parse(err._body).message
                          }
                        );
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
