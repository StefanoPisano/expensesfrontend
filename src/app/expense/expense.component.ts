import { Component, OnInit, Input, ElementRef} from '@angular/core';
import { Expenses } from '../Model/Expenses';
import { Exception } from '../exception/Exception';
import { MonthlyComponent } from '../monthly/monthly.component';

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
