import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { UserSignupComponent } from './components/user-signup/user-signup.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminFunctionsComponent } from './components/admin-functions/admin-functions.component';
import { ViewUsersComponent } from './components/view-users/view-users.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ViewBooksComponent } from './components/view-books/view-books.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';

import { SearchBookComponent } from './components/search-book/search-book.component';
import { UserFunctionsComponent } from './components/user-functions/user-functions.component';

import { IssueBookComponent } from './components/issue-book/issue-book.component';
import { RequestBookComponent } from './components/request-book/request-book.component';
import { ViewRequestComponent } from './components/view-request/view-request.component';
import { ViewIssuedDetailsComponent } from './components/view-issued-details/view-issued-details.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ReturnBookComponent } from './components/return-book/return-book.component';
import { SuperadminDashboardComponent } from './components/superadmin-dashboard/superadmin-dashboard.component';
import { ViewAdminsComponent } from './components/view-admins/view-admins.component';
import { UserViewIssueComponent } from './components/user-view-issue/user-view-issue.component';

import { EditAdminComponent } from './components/edit-admin/edit-admin.component';
import { RenewBookComponent } from './components/renew-book/renew-book.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatNativeDateModule } from '@angular/material/core';

import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    AddAdminComponent,
    UserSignupComponent,
    AddBookComponent,
    AdminFunctionsComponent,
    ViewUsersComponent,
    EditUserComponent,
    ViewBooksComponent,
    EditBookComponent,

    SearchBookComponent,
    UserFunctionsComponent,

    IssueBookComponent,
    RequestBookComponent,
    ViewRequestComponent,
    ViewIssuedDetailsComponent,
    ForgotPasswordComponent,
    ReturnBookComponent,
    SuperadminDashboardComponent,
    ViewAdminsComponent,
    UserViewIssueComponent,
    EditAdminComponent,
    RenewBookComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule, 
    ReactiveFormsModule, FormsModule, 
    FormsModule, BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule, NgxPaginationModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
