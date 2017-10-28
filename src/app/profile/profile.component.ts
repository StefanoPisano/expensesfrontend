import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
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

  user : User;

  changeUsernameForm = new FormGroup({
    usernameChange: new FormControl('', Validators.required),
  });

  changeEmailForm = new FormGroup({
    emailChange: new FormControl('', Validators.required),
  });

  changePasswordForm = new FormGroup({
    passwordChange: new FormControl('', Validators.required),
  });

  constructor(private profileService : ProfileService) {  
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
      err => console.log(err)
    )
  }

  changeUsername() {
    const _url = '/api/user/changeUsername';
    const tUser = this.getTempUser(this.changeUsernameForm, "usernameChange");
    
    this.profileService.updateUser(_url, tUser)
    .subscribe(
      res => this.user.username = tUser.username,
      err => console.log(err)
    )
  }

  changeEmail() {
    const _url = '/api/user/changeEmail';  
    const tUser = this.getTempUser(this.changeEmailForm, "emailChange");

    this.profileService.updateUser(_url, tUser)
    .subscribe(
      res => this.user.email = tUser.email,
      err => console.log(err)
    )
  }

  changePassword() {
    const _url = '/api/user/changePassword';    
    const tUser = this.getTempUser(this.changePasswordForm, "passwordChange");
    
    this.profileService.updateUser(_url, tUser)
    .subscribe(
      res => this.user.password = tUser.password,
      err => console.log(err)
    )
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
}
