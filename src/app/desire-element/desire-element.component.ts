import { Component, OnInit, Input } from '@angular/core';
import { Desire } from '../Model/Desire';
import { DesireElementService } from './desire-element-service';
import { Exception } from '../exception/Exception';
import { Router, NavigationEnd } from '@angular/router';
import { DesireComponent } from '../desire/desire.component';

@Component({
  selector: 'app-desire-element',
  templateUrl: './desire-element.component.html',
  styleUrls: ['./desire-element.component.css'],
  providers: [DesireElementService, Exception]
})
export class DesireElementComponent implements OnInit {

  @Input() desire : Desire;

  constructor(private desireComponent : DesireComponent, private desireElementService: DesireElementService, private exception:Exception) { }

  ngOnInit() {
  }

  moveDesire() {
    this.desireElementService.moveDesire(this.desire.id)
    .subscribe(
      res => this.desireComponent.getDesire(),
      err => console.log(err)
    );
  }

}
