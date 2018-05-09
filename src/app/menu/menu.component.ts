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

  path : String = "home";

  constructor(private menuService : MenuService, private router: Router) {
  }

  ngOnInit() {
  }

  showLogout() : String {
    return localStorage.getItem("jwt") ? "block" : "none";
  }

  showHome() : String {
    return this.router.url != "/home" ? "block" : "none";
  }

  go() {
    this.router.navigate([this.path]);
  }

  logout() : void {
    this.menuService
    .logout()
    .subscribe(
      res => this.router.navigate(['']),
      err => console.log(err)  
    )
    localStorage.removeItem("jwt");
  }
}
