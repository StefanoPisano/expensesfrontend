import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ScheduledService } from '../scheduled/scheduled.service';
import { MonthlyService } from '../monthly/monthly.service';
import { Message } from '../Model/Message';
import { Schedule } from '../Model/Schedule';

@Component({
  selector: 'add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css'],
  providers: [MonthlyService]
})
export class AddScheduleComponent implements OnInit {

  message: Message;
  categories: any[];
  days: Number[] = [];

  addScheduleForm = new FormGroup({
    addName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    addDescription: new FormControl('', [Validators.required, Validators.minLength(3)]),
    addPrice: new FormControl('', [Validators.required]),
    fromDate: new FormControl('', [Validators.required]),
    toDate: new FormControl('', [Validators.required]),
    addCategory: new FormControl('', Validators.required),
    inout: new FormControl('', [Validators.required]),
  });

  constructor(private scheduleService: ScheduledService, private monthlyService: MonthlyService) {
    this.message = new Message ('', '');
    this.populateDays();
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.monthlyService.getCategories()
    .subscribe(
      res => this.categories = JSON.parse(res._body).map(v => v.value),
      err => this.message.error = 'Error while retrieving categories'
    )
  }

  addSchedule() {
    this.resetStatus();

    if (!this.addScheduleForm.valid) {
      this.message.error = 'Invalid schedule, please check your data.';
      return;
    }

    this.scheduleService.setScheduled(this.getSchedule())
    .subscribe(
      res => this.message.success = 'Saved!',
      err => this.message.error =  JSON.parse(err._body).message
    );
  }

  private getSchedule(): Schedule{
    const inout = this.addScheduleForm.get('inout').value;
    const _description = this.addScheduleForm.get('addDescription').value;
    const _name = this.addScheduleForm.get('addName').value;
    const _category =  this.addScheduleForm.get('addCategory').value;
    const _fromDate =  this.addScheduleForm.get('fromDate').value;
    const _toDate =  this.addScheduleForm.get('toDate').value;
    let _price = this.addScheduleForm.get('addPrice').value;

    _price = inout === 'out' ? _price * -1 : _price;

    return new Schedule(null, _name, _description, _category, _price, this.getFormattedDate(_fromDate), this.getFormattedDate(_toDate));
  }

  populateDays(): void {
    const date = new Date();
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    this.days = Array
    .apply(null, Array(lastDay.getDate() + 1))
    .map(function (_, i) {
        return i;
    });

    this.days.splice(0, 1);
  }

  private getFormattedDate(date): Date {
    const _date = new Date();
    return new Date(_date.getFullYear(), _date.getMonth(), date);

  }

  private resetStatus(): void {
    this.message = new Message('', '');
    this.addScheduleForm.get('addCategory').setValue('Food');

  }
}
