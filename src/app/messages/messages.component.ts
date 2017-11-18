import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../Model/Message';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  @Input() message : Message;
  
  constructor() { }

  ngOnInit() {
  }

  showError() {
    if(this.message.error) {
      return "block";
    }
    return "none";
  }

  showSuccess() {
    if(this.message.success) {
      return "block";
    }
    return "none";
  }
}
