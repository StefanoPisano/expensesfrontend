import { Component, OnInit, Input, ElementRef} from '@angular/core';
import { Expenses } from '../Model/Expenses';
import { ExpenseService } from './expense.service';
import { Exception } from '../exception/Exception';
import { MonthlyComponent } from '../monthly/monthly.component';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css'],
  providers: [ExpenseService, Exception]
})
export class ExpenseComponent implements OnInit {

  @Input() expense : Expenses;
  reef:ElementRef;

  constructor(private expenseService: ExpenseService) {  
  }

  ngOnInit() {
    
  }

  removeExpense() {
    this.expenseService.removeService(this.expense.idExpenses)
    .subscribe(
      res => console.log("YOOO"),
      err => console.log("NOOOOO")
    )
  }

  getColor() {
    return this.expense.price < 0 ? "red" : "green";
  }
}
