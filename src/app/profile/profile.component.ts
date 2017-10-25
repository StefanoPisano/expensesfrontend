import { Component, OnInit } from '@angular/core';
import {ProfileService} from './profile.service';
import { Exception } from '../exception/Exception';
import {User} from '../Model/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfileService, Exception]
})
export class ProfileComponent implements OnInit {

  user : User;

  constructor(private profileService : ProfileService) {  
    this.user = new User('','','');
   }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.profileService.loadData()
    .subscribe(
      res => {
        this.user = JSON.parse(res._body);
      },
      err => console.log(err)
    )
  }
}
