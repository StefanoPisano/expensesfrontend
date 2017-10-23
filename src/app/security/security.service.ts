import { Component, OnInit, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class SecurityService implements CanActivate {

  constructor(private router: Router) {}

  ngOnInit() {
  }

  canActivate() {
    console.log("Qui")
    if(localStorage.getItem("jwt") != null){
      console.log("sono true")
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
