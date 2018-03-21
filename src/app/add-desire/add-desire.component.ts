import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DesireService } from '../desire/desire.service';
import { MonthlyService } from '../monthly/monthly.service';
import { Desire } from '../Model/Desire';
import { Message } from '../Model/Message';

@Component({
  selector: 'add-desire',
  templateUrl: './add-desire.component.html',
  styleUrls: ['./add-desire.component.css'],
  providers: [MonthlyService]

})
export class AddDesireComponent implements OnInit {

  message: Message;
  categories:any[];

  addDesireForm = new FormGroup({
    desireDescription: new FormControl('', [Validators.required, Validators.minLength(3)]),
    desirePrice: new FormControl('', [Validators.required]),
    desireCategory: new FormControl('', Validators.required),
  });

  constructor(private desireService : DesireService, private monthlyService : MonthlyService) { 
    this.message = new Message ("", "");
  }

  ngOnInit() {
    this.getCategories();
  }

  addDesire():void {
    this.resetStatus();

    const dto = this.getDesireDto();

    if(!this.addDesireForm.valid) {
      this.message.error = "Invalid desire, please check your data.";
      return;      
    }

    this.desireService.createDesire(dto)
    .subscribe(
      res => this.message.success = 'Desire inserted successfully',
      err => this.message.error = "Error while inserting desire"
    )
  }

  private getDesireDto() : Desire{
    const _description = this.addDesireForm.get("desireDescription").value;
    var _category =  this.addDesireForm.get("desireCategory").value;
    
    if(!_category) {
      this.addDesireForm.get("desireCategory").setValue('Other');
      _category = 'Other';
    }

    var _price = this.addDesireForm.get("desirePrice").value;

    return new Desire(null, _description, _category, _price);
  }

  getCategories() {
    this.monthlyService.getCategories()
    .subscribe(
      res => this.categories = JSON.parse(res._body).map(v => v.value),
      err => this.message.error = "Error while retrieving categories"
    )
  }
  
  private resetStatus() : void {
    this.message = new Message("", "");
  }
}
