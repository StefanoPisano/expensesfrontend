import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MonthlyService } from '../monthly/monthly.service';
import { Expenses } from '../Model/Expenses';
import { Message } from '../Model/Message';

@Component({
  selector: 'add-expenses',
  templateUrl: './add-expenses.component.html',
  styleUrls: ['./add-expenses.component.css']
})
export class AddExpensesComponent implements OnInit {

  message: Message;
  categories:any[];
  days:Number[] = [];

  addExpensesForm = new FormGroup({
    addDescription: new FormControl('', [Validators.required, Validators.minLength(3)]),
    addPrice: new FormControl('', [Validators.required]),
    addDate: new FormControl('', [Validators.required]),  
    addCategory: new FormControl('', Validators.required),
    inout: new FormControl('', [Validators.required]),
  });

  constructor(private monthlyService : MonthlyService) { 
    this.message = new Message ("", "");
    this.populateDays();
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.monthlyService.getCategories()
    .subscribe(
      res => this.categories = JSON.parse(res._body).map(v => v.value),
      err => this.message.error = "Error while retrieving categories"
    )
  }

  addExpenses() {
    this.resetStatus();
     
    if(!this.addExpensesForm.valid) {
      this.message.error = "Invalid expenses, please check your data.";
      return;      
    }

    this.monthlyService.saveExpenses(this.getExpenseDto())
    .subscribe(
      res => this.message.success = "Saved!",
      err => this.message.error =  JSON.parse(err._body).message
    );            
  }

  private getExpenseDto() : Expenses{
    const inout = this.addExpensesForm.get("inout").value;
    const _description = this.addExpensesForm.get("addDescription").value;
    const _category =  this.addExpensesForm.get("addCategory").value;
    var _date =  this.addExpensesForm.get("addDate").value;
    var _price = this.addExpensesForm.get("addPrice").value;
    
    _price = inout == "out" ? _price * -1 : _price;

    return new Expenses(null, _description, _category, _price, this.getFormattedDate(_date), "");
  }

  populateDays() : void {
    var date = new Date();
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    this.days = Array
    .apply(null, Array(lastDay.getDate() + 1))
    .map(function (_, i) {
        return i;
    });

    this.days.splice(0,1);
  }

  private getFormattedDate(date) : Date {
    const _date = new Date();
    return new Date(_date.getFullYear(), _date.getMonth(), date);

  }

  private resetStatus() : void {
    this.message = new Message("", "");
    this.addExpensesForm.get("addCategory").setValue('Food');

  }
}