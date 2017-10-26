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
        debugger;
      },
      err => console.log(err)
    )
  }

  changeUsername() {
    const _url = '/api/user/changeUsername';
    const _data = this.changeUsernameForm.get('usernameChange').value;

    this.profileService.updateUser(_url, _data)
    .subscribe(
      res => this.user.username = _data,
      err => console.log(err)
    )
  }

  changeEmail() {
    const _url = '/api/user/changeEmail';  
    const _data = this.changeEmailForm.get('emailChange').value;
    
    this.profileService.updatePostUser(_url, _data)
    .subscribe(
      res => this.user.email = _data,
      err => console.log(err)
    )
  }

  changePassword() {
    const _url = '/api/user/changePassword';    
    const _data = this.changePasswordForm.get('passwordChange').value;
    
    this.profileService.updateUser(_url, _data)
    .subscribe(
      res => this.user.password = _data,
      err => console.log(err)
    )
  }
}
