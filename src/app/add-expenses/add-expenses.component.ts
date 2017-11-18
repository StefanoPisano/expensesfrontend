import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MonthlyService } from '../monthly/monthly.service';
import { Expenses } from '../Model/Expenses';

@Component({
  selector: 'add-expenses',
  templateUrl: './add-expenses.component.html',
  styleUrls: ['./add-expenses.component.css']
})
export class AddExpensesComponent implements OnInit {

  errorMessage:string;
  successMessage:string;
  categories:any[];

  addExpensesForm = new FormGroup({
    addDescription: new FormControl('', [Validators.required, Validators.minLength(3)]),
    addPrice: new FormControl('', [Validators.required]),
    addDate: new FormControl('', [Validators.required]),  
    addCategory: new FormControl('', Validators.required),
    inout: new FormControl('', [Validators.required])  
  });
  
  constructor(private monthlyService : MonthlyService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.monthlyService.getCategories()
    .subscribe(
      res => {
        this.categories = JSON.parse(res._body).map(v => v.value);
      },
      err => this.errorMessage = "Error while retrieving categories"
    )
  }

  addExpenses() {
    this.resetStatus();
     
    if(!this.addExpensesForm.valid) {
      this.errorMessage = "Invalid expenses, please check your data.";
      return;      
    }

    this.monthlyService.saveExpenses(this.getExpenseDto())
    .subscribe(
      res => {
        this.successMessage = "Saved!"
      },
      err => this.errorMessage =  JSON.parse(err._body).message
    );            
  }

  private getExpenseDto() : Expenses{
    const inout = this.addExpensesForm.get("inout").value;
    const _description = this.addExpensesForm.get("addDescription").value;
    const _category =  this.addExpensesForm.get("addCategory").value;
    const _date =  this.addExpensesForm.get("addDate").value;

    var _price;
    if(inout === "out")  {
      _price = this.addExpensesForm.get("addPrice").value * -1;
    } else {
      _price = this.addExpensesForm.get("addPrice").value;
    }

    return new Expenses(_description, _category, _price, _date, "");
  }

  private resetStatus() {
    this.errorMessage = "";
    this.successMessage = "";
  }
}