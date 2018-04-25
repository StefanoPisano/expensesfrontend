import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import {AppRoutingModule} from './app.routing.module';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {LoginService} from './login/login.service';
import {RegisterService} from './register/register.service';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { MonthlyComponent } from './monthly/monthly.component';
import { ExpenseComponent } from './expense/expense.component';
import { AddExpensesComponent } from './add-expenses/add-expenses.component';
import { MessagesComponent } from './messages/messages.component';
import { MenuComponent } from './menu/menu.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DesireComponent } from './desire/desire.component';
import { DesireElementComponent } from './desire-element/desire-element.component';
import { AddDesireComponent } from './add-desire/add-desire.component';
import { HistoryComponent } from './history/history.component';
import { DataTableModule } from 'angular-4-data-table/src/index';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    MonthlyComponent,
    ExpenseComponent,
    AddExpensesComponent,
    MessagesComponent,
    MenuComponent,
    NavigationComponent,
    DesireComponent,
    DesireElementComponent,
    AddDesireComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    DataTableModule
  ],
  providers: [LoginService, RegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
