import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  isVisible() {
    if(localStorage.getItem("jwt") != null){
      return "block";
    } else {
      return "none";
    }
  }
}
