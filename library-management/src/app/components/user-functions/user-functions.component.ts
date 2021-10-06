import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { ToasterService } from 'src/app/services/toaster.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-functions',
  templateUrl: './user-functions.component.html',
  styleUrls: ['./user-functions.component.css']
})
export class UserFunctionsComponent implements OnInit {
  mailId?: string;
  user: Observable<User> | any
  constructor(public router: Router, public service: UserService) { }

  ngOnInit(): void {
    this.mailId = localStorage.getItem('userEmail') as string;
    this.service.getUserByMailId(this.mailId).subscribe(data => {
      this.user = data
      this.user = this.user.data

    })

  }
  view() {

    this.router.navigate(['edituser'])
  }

  searchBooks() {
    this.router.navigate(['searchbooks'])
  }
  viewIssueDetails() {
    this.router.navigate(['viewissue'])

  }
  returnBook() {
    this.router.navigate(['returnbook'])

  }
  renewBook() {
    this.router.navigate(['renewbook'])
  }
  logout() {
    localStorage.removeItem('userEmail');
    this.router.navigate(['login'])

  }
  

}
