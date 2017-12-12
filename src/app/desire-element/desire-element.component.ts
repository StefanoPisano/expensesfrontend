import { Component, OnInit, Input } from '@angular/core';
import { Desire } from '../Model/Desire';

@Component({
  selector: 'app-desire-element',
  templateUrl: './desire-element.component.html',
  styleUrls: ['./desire-element.component.css']
})
export class DesireElementComponent implements OnInit {

  @Input() desire : Desire;

  constructor() { }

  ngOnInit() {
  }

}
