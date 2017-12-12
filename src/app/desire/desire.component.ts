import { Component, OnInit } from '@angular/core';
import { DesireService } from './desire.service';
import { Exception } from '../exception/Exception';
import { Desire } from '../Model/Desire';

@Component({
  selector: 'app-desire',
  templateUrl: './desire.component.html',
  styleUrls: ['./desire.component.css', '../home/home.component.css'],
  providers: [DesireService, Exception]
})
export class DesireComponent implements OnInit {

  listOfDesire : Desire[];

  constructor(private desireService : DesireService, private exception : Exception) { 
    this.getDesire();
  }

  ngOnInit() {
  }

  getDesire() {
    this.desireService.getDesire()
    .subscribe(
      res => this.listOfDesire = JSON.parse(res._body),
      err => console.log(err)
    )
  }
}
