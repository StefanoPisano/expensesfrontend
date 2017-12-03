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
    return this.message.error ? "block" : "none";
  }

  showSuccess() {
    return this.message.success ? "block" : "success";
  }
}
