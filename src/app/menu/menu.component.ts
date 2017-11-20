import { Component, OnInit, Input } from '@angular/core';
import { User } from '../Model/User';
import { MenuService } from './menu-service';
import { Exception } from '../exception/Exception';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [MenuService, Exception]
})
export class MenuComponent implements OnInit {

  user : User;

  constructor(private menuService : MenuService, private router: Router) {
    if(localStorage.getItem("jwt")) {
      this.user = this.getUser();
    } else {
      this.user = new User("", "", "");
    }
  }

  ngOnInit() {
  }

  showLogout() : String {
    return localStorage.getItem("jwt") ? "block" : "none";
  }

  getUser() : User {
    this.menuService.getUser()
    .subscribe(
      res => {
        this.user = JSON.parse(res._body)
      },
      err => console.log(err)
    );
    return this.user;
  }

  logout() : void {
    this.menuService.logout()
    .subscribe(
      res => this.router.navigate(['']),
      err => console.log(err)  
    )
    localStorage.removeItem("jwt");
  }
}
