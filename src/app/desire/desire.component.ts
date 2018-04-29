import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DesireService } from './desire.service';
import { Exception } from '../exception/Exception';
import { Desire } from '../Model/Desire';
import {Message} from '../Model/Message';
import { DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-desire',
  templateUrl: './desire.component.html',
  styleUrls: ['./desire.component.css', '../home/home.component.css'],
  providers: [DesireService, Exception],
  encapsulation: ViewEncapsulation.None
})
export class DesireComponent implements OnInit {

  message: Message;
  itemResource : DataTableResource<{}>;
  items = [];
  itemCount = 0;

  constructor(private desireService : DesireService, private exception : Exception) { 
  }

  ngOnInit() {
  }

  reloadItems(params) {
    this.desireService.getDesire()
    .subscribe(
      res => {
        this.itemResource = new DataTableResource(JSON.parse(res._body));
        this.itemResource.query(params).then(items => this.items = items);
        this.itemResource.count().then(count => this.itemCount = count);
      },
      err => console.log(err)
    )
  }

  moveDesire(desire: Desire) {
    this.desireService.moveDesire(desire.id)
    .subscribe(
      res => this.items = this.items.filter(obj => obj !== desire),
      err => console.log(err)
    );
  }

  removeDesire(desire : Desire) {
    this.desireService
    .removeDesire(desire.id)
    .subscribe(
      res => this.items = this.items.filter(obj => obj !== desire),
      err => this.message.error = 'Error while removing expense.'
    )
  }
}
