import { Component, OnInit } from '@angular/core';
import { DesireService } from './desire.service';
import { Exception } from '../exception/Exception';
import { Desire } from '../Model/Desire';
import {Message} from '../Model/Message';

@Component({
  selector: 'app-desire',
  templateUrl: './desire.component.html',
  styleUrls: ['./desire.component.css', '../home/home.component.css'],
  providers: [DesireService, Exception]
})
export class DesireComponent implements OnInit {

  listOfDesire : Desire[];
  message: Message;

  constructor(private desireService : DesireService, private exception : Exception) { 
    this.getDesire();
  }

  ngOnInit() {
  }

  getDesire() {
    this.listOfDesire = [];
    this.desireService.getDesire()
    .subscribe(
      res => this.listOfDesire = JSON.parse(res._body),
      err => console.log(err)
    )
  }

  moveDesire(desire: Desire) {
    this.desireService.moveDesire(desire.id)
    .subscribe(
      res => this.listOfDesire = this.listOfDesire.filter(obj => obj !== desire),
      err => console.log(err)
    );
  }

  removeDesire(desire : Desire) {
    this.desireService
    .removeDesire(desire.id)
    .subscribe(
      res => this.listOfDesire = this.listOfDesire.filter(obj => obj !== desire),
      err => this.message.error = 'Error while removing expense.'
    )
  }
}
