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

  addExpensesForm = new FormGroup({
    addDescription: new FormControl('', [Validators.required, Validators.minLength(3)]),
    addPrice: new FormControl('', [Validators.required]),
    addDate: new FormControl('', [Validators.required]),    
  });

  constructor(private monthlyService : MonthlyService) { }

  ngOnInit() {
  }

  addExpenses() {
    debugger;
    const _exp = new Expenses(this.addExpensesForm.get("addDescription").value,
                              "Other", 
                              this.addExpensesForm.get("addPrice").value,
                              this.addExpensesForm.get("addDate").value,
                              
                            );
                     
    this.monthlyService.saveExpenses(_exp)
    .subscribe(
      res => {console.log(res)
      },
      err => console.log(err)
    )
  }
}
