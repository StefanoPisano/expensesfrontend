import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Exception } from '../exception/Exception';
import {MonthlyService} from './monthly.service';
import {Expenses} from '../Model/Expenses';


@Component({
  selector: 'app-monthly',
  templateUrl: './monthly.component.html',
  styleUrls: ['./monthly.component.css', '../home/home.component.css', './monthlyadd.component.css'],
  providers: [MonthlyService, Exception]
})
export class MonthlyComponent implements OnInit {

  errorMessage : string;
  successMessage ; string;
  categories: any[];

  addExpensesForm = new FormGroup({
    addDescription: new FormControl('', [Validators.required, Validators.minLength(3)]),
    addPrice: new FormControl('', [Validators.required]),
    addDate: new FormControl('', [Validators.required]),  
    addCategory: new FormControl('', Validators.required)  
  });

  constructor(private monthlyService : MonthlyService) { }

  ngOnInit() {
    this.monthlyService.getCategories()
    .subscribe(
      res => {
        this.categories = JSON.parse(res._body).map(v => v.value);
      },
      err => console.log(err)
    )
  }

  addExpenses() {
    this.resetStatus();
    
    const _exp = new Expenses(this.addExpensesForm.get("addDescription").value,
                              this.addExpensesForm.get("addCategory").value, 
                              this.addExpensesForm.get("addPrice").value,
                              this.addExpensesForm.get("addDate").value
                            );
    if(this.addExpensesForm.valid) {
      this.monthlyService.saveExpenses(_exp)
      .subscribe(
        res => {
          this.successMessage = "Saved!"
        },
        err => this.errorMessage =  JSON.parse(err._body).message
      )
    } else {
      this.errorMessage = "Invalid expenses, please check your data.";
    }             
  }

  private resetStatus() {
    this.errorMessage = "";
    this.successMessage = "";
  }
}
