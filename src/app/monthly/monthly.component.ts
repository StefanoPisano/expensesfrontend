import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Exception } from '../exception/Exception';
import {MonthlyService} from './monthly.service';
import {ProfileService} from '../profile/profile.service';
import {Expenses} from '../Model/Expenses';
import { Message } from '../Model/Message';


@Component({
  selector: 'app-monthly',
  templateUrl: './monthly.component.html',
  styleUrls: ['./monthly.component.css', '../home/home.component.css'],
  providers: [MonthlyService, ProfileService, Exception]
})
export class MonthlyComponent implements OnInit {

  message : Message;
  listOfExpenses: Expenses[];
  remaining: number;
  budget: number;
  warningMessage:String;

  constructor(private monthlyService : MonthlyService, private profileService : ProfileService) { 
    this.message = new Message ("", "");
    this.getExpenses();
    this.getBudget();
    this.getRemaining();  
  }

  ngOnInit() {
  }

  getBudget() {
    this.profileService.loadBudget()
    .subscribe(
      res => {
        this.budget = JSON.parse(res._body).total;
        this.warningMessage = !this.budget ? "You have to set a budget if you want to use this software" : "";
      },
      err => this.message.error = "Error while retrieving budget"
    );    
  }

  getColor() {
    const _val = this.remaining;
    
    if(this.remaining <= 0) {
      return "red";
    }
  
    if(_val <= this.budget/2) {
      return "orange";
    }

    return "green";
    }

  getExpenses() {
    this.monthlyService
    .getExpenses()
    .subscribe(
      res => this.listOfExpenses = JSON.parse(res._body),
      err => this.message.error = "Error while retrieving expenses"
      )
    }


    pippo() {
      console.log("sono pippi");
    }

    getRemaining() {
      this.monthlyService
      .getRemaining()
      .subscribe(
        res => this.remaining = JSON.parse(res._body),
        err => this.message.error = "Error while retrieving remaining budget"
      )
    }

    isShowable() : String {      
      return this.budget ? "block" : "none";
    }

    showWarning() : String {      
      return this.warningMessage ? "block" : "none";
    }
}
