import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  path : String = "home";

  constructor(private router: Router) { }

  ngOnInit() {
  }

  go() {
    debugger;
    this.router.navigate([this.path]);
  }
}
