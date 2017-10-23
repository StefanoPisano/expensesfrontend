import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {SecurityService} from './security/security.service';



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
  }
];


@NgModule({
  imports : [RouterModule.forRoot(appRoutes)],
  providers : [SecurityService],
  exports : [RouterModule]
})

export class AppRoutingModule { }
