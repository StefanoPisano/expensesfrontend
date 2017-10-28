import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {ProfileService} from './profile.service';
import { Exception } from '../exception/Exception';
import {User} from '../Model/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', 'profile.tabs.component.css'],
  providers: [ProfileService, Exception]
})
export class ProfileComponent implements OnInit {

  errorMessage : string;
  successMessage : string;
  user : User;

  changeUsernameForm = new FormGroup({
    usernameChange: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  changeEmailForm = new FormGroup({
    emailChange: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern("[^ @]*@[^ @]*")])
  });

  changePasswordForm = new FormGroup({
    passwordChange: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  repeatPasswordForm = new FormGroup({
    repeatPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  });


  constructor(private profileService : ProfileService, private router: Router) {  
    this.user = new User('','','');
   }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.profileService.loadData()
    .subscribe(
      res => {
        this.user = JSON.parse(res._body);
      },
      err => this.errorMessage = JSON.parse(err._body).message
    )
  }

  changeUsername() {
    this.resetStatus();
    if(this.changeUsernameForm.valid){
      const _url = '/api/user/changeUsername';
      const tUser = this.getTempUser(this.changeUsernameForm, "usernameChange");
      
      this.profileService.updateUser(_url, tUser)
      .subscribe(
        res => this.router.navigate([""]),
        err => this.errorMessage = JSON.parse(err._body).message
      )
    } else {
      this.errorMessage = "Username must be at least 6 characters"
    }
  }

  changeEmail() {
    this.resetStatus();
    if(this.changeEmailForm.valid) {
      const _url = '/api/user/changeEmail';  
      const tUser = this.getTempUser(this.changeEmailForm, "emailChange");

      this.profileService.updateUser(_url, tUser)
      .subscribe(
        res => {
          this.user.email = tUser.email
          this.successMessage = "Email changed!"
        },
        err => this.errorMessage = JSON.parse(err._body).message
      )
    } else {
      this.errorMessage = "Invalid Email!"      
    }
  }

  changePassword() {
    this.resetStatus();
    debugger;
    if(this.isValidPassword() && this.changePasswordForm.valid) {
      const _url = '/api/user/changePassword';    
      const tUser = this.getTempUser(this.changePasswordForm, "passwordChange");
      
      this.profileService.updateUser(_url, tUser)
      .subscribe(
        res => {
          this.user.password = tUser.password;
          this.successMessage = "Password changed!"
        },
        err => this.errorMessage = JSON.parse(err._body).message
      )
    } else if(!this.isValidPassword()){
      this.errorMessage = "Passwords don't match"
    } else {
      this.errorMessage = "Error changing password!"     
    }
  }

  isValidPassword() : boolean {
    return this.changePasswordForm.get("passwordChange").value == this.repeatPasswordForm.get("repeatPassword").value;
  }

  getTempUser(form:FormGroup, field:string) {
    const _value = form.get(field).value;

    switch(field) {
      case 'usernameChange' :
        return new User(_value, '', '');
      case 'passwordChange' :
        return new User('', _value, '');
      default :
        return new User('', '', _value);
    }
  }

  private resetStatus() {
    this.errorMessage = "";
    this.successMessage = "";
  }
}
