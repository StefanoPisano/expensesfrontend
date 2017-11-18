import { Component, OnInit, Input } from '@angular/core';
import { Expenses } from '../Model/Expenses';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  @Input() expense : Expenses;

  constructor() {  
  }

  ngOnInit() {
    
  }

  getColor() {
    return this.expense.price < 0 ? "red" : "green";
  }
}
