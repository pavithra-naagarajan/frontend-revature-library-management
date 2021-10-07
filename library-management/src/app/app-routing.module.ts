import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { AdminFunctionsComponent } from './components/admin-functions/admin-functions.component';
import { EditAdminComponent } from './components/edit-admin/edit-admin.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { IssueBookComponent } from './components/issue-book/issue-book.component';
import { LoginComponent } from './components/login/login.component';
import { RenewBookComponent } from './components/renew-book/renew-book.component';
import { RequestBookComponent } from './components/request-book/request-book.component';
import { ReturnBookComponent } from './components/return-book/return-book.component';
import { SearchBookComponent } from './components/search-book/search-book.component';
import { SuperadminDashboardComponent } from './components/superadmin-dashboard/superadmin-dashboard.component';
import { UserFunctionsComponent } from './components/user-functions/user-functions.component';
import { UserSignupComponent } from './components/user-signup/user-signup.component';
import { UserViewIssueComponent } from './components/user-view-issue/user-view-issue.component';

import { ViewAdminsComponent } from './components/view-admins/view-admins.component';
import { ViewBooksComponent } from './components/view-books/view-books.component';
import { ViewIssuedDetailsComponent } from './components/view-issued-details/view-issued-details.component';
import { ViewMoreIssuedetailsComponent } from './components/view-more-issuedetails/view-more-issuedetails.component';

import { ViewRequestComponent } from './components/view-request/view-request.component';
import { ViewUsersComponent } from './components/view-users/view-users.component';

const routes: Routes = [
  { path: 'usersignup', component: UserSignupComponent },
  { path: 'adminfunctions', component: AdminFunctionsComponent },

  { path: 'viewusers', component: ViewUsersComponent },
  { path: 'viewbooks', component: ViewBooksComponent },
  { path: 'addbooks', component: AddBookComponent },
  { path: 'viewrequest', component: ViewRequestComponent },
  { path: 'viewissuedbooks', component: ViewIssuedDetailsComponent },
  { path: 'edituser', component: EditUserComponent },
  { path: 'editbook/:bookId', component: EditBookComponent },
  { path: 'userfunctions', component: UserFunctionsComponent },
  { path: 'userfunctions/:userId', component: UserFunctionsComponent },

  { path: 'viewmore/:issueId', component: ViewMoreIssuedetailsComponent },
  { path: 'searchbooks', component: SearchBookComponent },
  { path: 'requestbook/:bookId', component: RequestBookComponent },
  {
    path: 'issuebook/:userId/:bookId/:numberOfDays/:requestId',
    component: IssueBookComponent,
  },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'returnbook', component: ReturnBookComponent },
  { path: 'superadmin', component: SuperadminDashboardComponent },
  { path: 'viewadmins', component: ViewAdminsComponent },
  { path: 'addadmin', component: AddAdminComponent },
  { path: 'viewissue', component: UserViewIssueComponent },
  { path: 'editadmin', component: EditAdminComponent },
  { path: 'renewbook', component: RenewBookComponent },
  { path: '**', component: LoginComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
