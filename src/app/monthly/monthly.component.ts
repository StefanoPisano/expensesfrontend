import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Exception } from '../exception/Exception';
import {MonthlyService} from './monthly.service';
import {ProfileService} from '../profile/profile.service';
import {Expenses} from '../Model/Expenses';


@Component({
  selector: 'app-monthly',
  templateUrl: './monthly.component.html',
  styleUrls: ['./monthly.component.css', '../home/home.component.css'],
  providers: [MonthlyService, ProfileService, Exception]
})
export class MonthlyComponent implements OnInit {

  errorMessage : string;
  successMessage ; string;
  listOfExpenses: Expenses[];
  remaining: number;
  budget: number;

  constructor(private monthlyService : MonthlyService, private profileService : ProfileService) { 
    this.getExpenses();
    this.getBudget();
    this.getRemaining();
  }

  ngOnInit() {
  }

  getBudget() {
    this.profileService.loadBudget()
    .subscribe(
      res => this.budget = JSON.parse(res._body).total,
      err => this.errorMessage = "Error while retrieving budget"
    )
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
    this.monthlyService.getExpenses()
    .subscribe(
      res => {
        this.listOfExpenses = JSON.parse(res._body);
      },
      err => this.errorMessage = "Error while retrieving expenses"
      )
    }

    getRemaining() {
      this.monthlyService.getRemaining()
      .subscribe(
        res => {
          this.remaining = JSON.parse(res._body);
        },
        err => this.errorMessage = "Error while retrieving remaining budget"
      )
    }
}
