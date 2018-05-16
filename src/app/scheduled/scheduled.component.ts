import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ScheduledService } from './scheduled.service';
import { Exception } from '../exception/Exception';
import { Message } from '../Model/Message';
import { DataTableResource } from 'angular-4-data-table';
import { Schedule } from '../Model/Schedule';

@Component({
  selector: 'app-scheduled',
  templateUrl: './scheduled.component.html',
  styleUrls: ['./scheduled.component.css'],
  providers: [ScheduledService, Exception],
  encapsulation: ViewEncapsulation.None
})
export class ScheduledComponent implements OnInit {

  message: Message;
  itemResource: DataTableResource<{}>;
  items = [];
  itemCount = 0;

  constructor(private scheduledService: ScheduledService, private exception: Exception) { }

  ngOnInit() {
  }

  reloadItems(params) {
    this.scheduledService.getScheduled()
      .subscribe(
        res => {
          this.itemResource = new DataTableResource(JSON.parse(res._body));
          this.itemResource.query(params).then(items => this.items = items);
          this.itemResource.count().then(count => this.itemCount = count);
        },
        err => console.log(err)
      )
  }

  removeDesire(scheduled: Schedule) {
    this.scheduledService
      .removeDesire(scheduled.id)
      .subscribe(
        res => this.items = this.items.filter(obj => obj !== scheduled),
        err => this.message.error = 'Error while removing schedule.'
      )
  }

}
