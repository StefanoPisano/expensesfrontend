import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {ProfileService} from './profile.service';
import { Exception } from '../exception/Exception';
import {User} from '../Model/User';
import {Budget} from '../Model/Budget';

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
  budget : number;

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

  changeBudgetForm = new FormGroup({
    budgetChange: new FormControl('', [Validators.required])
  });

  constructor(private profileService : ProfileService, private router: Router) {  
    this.user = new User('','','');
   }

  ngOnInit() {
    this.loadData();
    this.getBudget();
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

    if(!this.changeUsernameForm.valid){
      this.errorMessage = "Username must be at least 6 characters"
      return;
    }

      const _url = '/api/user/changeUsername';
      const tUser = this.getTempUser(this.changeUsernameForm, "usernameChange");
      
      this.profileService.updateUser(_url, tUser)
      .subscribe(
        res => this.router.navigate([""]),
        err => this.errorMessage = JSON.parse(err._body).message
      )
  }

  changeEmail() {
    this.resetStatus();

    if(!this.changeEmailForm.valid) {
      this.errorMessage = "Invalid Email!"      
      return;      
    }

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
  }

  changePassword() {
    this.resetStatus();

    if(!this.isValidPassword()){
      this.errorMessage = "Passwords don't match";
      return;
    }

    if(!this.changePasswordForm.valid) {
      this.errorMessage = "Password must be at least 6 characters long";
      return;
    }

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
  }

  getBudget() {
    this.profileService.loadBudget()
    .subscribe(
      res => this.budget = JSON.parse(res._body).total,
      err => this.errorMessage = "Error while retrieving budget"
    )
  }

  changeBudget() {
    if(this.changeBudgetForm.valid) {
      const _url = '/api/budget';
      const _dto = new Budget(this.changeBudgetForm.get("budgetChange").value);

      this.profileService.updatBudget(_url, _dto)
      .subscribe(
        res => {
          this.successMessage = "Budget Saved!";
          this.budget = _dto.total;
          this.getBudget();
        },
        err => this.errorMessage = "Error while changing budget"
      )
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
