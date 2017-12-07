import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {SecurityService} from './security/security.service';
import {ProfileComponent} from './profile/profile.component';
import {MonthlyComponent} from './monthly/monthly.component';
import { DesireComponent } from './desire/desire.component';

const appRoutes: Routes = [
  { 
    path: '', 
    component: LoginComponent 
  },
  { 
    path: 'register', 
    component: RegisterComponent },
  { 
    path: 'home', 
    component: HomeComponent, 
    canActivate: [SecurityService]
  },
  { 
    path: 'profile', 
    component: ProfileComponent, 
    canActivate: [SecurityService]
  },
  {
    path: 'monthly',
    component: MonthlyComponent,
    canActivate: [SecurityService]
  },
  {
    path: 'desire',
    component: DesireComponent,
    canActivate: [SecurityService]
  }
];


@NgModule({
  imports : [RouterModule.forRoot(appRoutes)],
  providers : [SecurityService],
  exports : [RouterModule]
})

export class AppRoutingModule { }
