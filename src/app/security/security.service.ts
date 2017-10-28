import { Component, OnInit, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class SecurityService implements CanActivate {

  constructor(private router: Router) {}

  ngOnInit() {
  }

  canActivate() {
    if(localStorage.getItem("jwt") != null){
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
