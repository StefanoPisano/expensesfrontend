import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Expenses} from '../Model/Expenses';
import { HistoryService } from './history.service';
import { Message } from '../Model/Message';
import { Exception } from '../exception/Exception';
import { DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  providers:[HistoryService, Exception] ,
  encapsulation: ViewEncapsulation.None
})
export class HistoryComponent implements OnInit {

  listOfExpenses: Expenses[];
  message: Message;
  itemResource : DataTableResource<{}>;
  items = [];
  itemCount = 0;

  constructor(private historyService: HistoryService) { 
    this.message = new Message("", "");
  }

  ngOnInit() {
  }



    reloadItems(params) {
      this.historyService
      .getFullHistory()
      .subscribe(
        res => {
          this.itemResource = new DataTableResource(JSON.parse(res._body));
          this.itemResource.query(params).then(items => this.items = items);
          this.itemResource.count().then(count => this.itemCount = count);
        },
        err => this.message.error = "Error while retrieving expenses"
        )

    }

    // special properties:
    rowClick(rowEvent) {
        console.log('Clicked: ' + rowEvent.row.item.name);
    }

    rowDoubleClick(rowEvent) {
        alert('Double clicked: ' + rowEvent.row.item.name);
    }

    rowTooltip(item) { return item.jobTitle; }
}
