import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { IssueBook } from 'src/app/models/issue-book';
import { User } from 'src/app/models/user';
import { IssueBookService } from 'src/app/services/issue-book.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-renew-book',
  templateUrl: './renew-book.component.html',
  styleUrls: ['./renew-book.component.css'],
})
export class RenewBookComponent implements OnInit {
  mailId?: string;
  renewForm?: FormGroup;
  details: Observable<IssueBook[]> | any;
  user: Observable<User> | any;
  userId?: number;
  fine?: number;
  constructor(
    public router: Router,
    public userService: UserService,
    public issueBookService: IssueBookService,
    public formBuilder: FormBuilder,
    public toaster: ToasterService
  ) {}

  ngOnInit(): void {
    this.mailId = localStorage.getItem('userEmail') as string;
    this.userService.getUserByMailId(this.mailId).subscribe((data) => {
      this.user = data;
      this.user = this.user.data;
      this.userId = this.user.userId;
      this.issueBookService
        .getIssueDetailsByUserId(this.userId)
        .subscribe((data: any[]) => {
          this.details = data;
          this.details = this.details.data;
        });
    });
    this.renewForm = this.formBuilder.group({
      issueId: ['', Validators.required],
    });
  }
  renewBook() {
    this.updateFine(this.renewForm.get('issueId').value);
  }

  updateFine(issueId: number) {
    this.issueBookService.updateFine(issueId).subscribe((data) => {
      this.issueBookService
        .getIssueDetailsByIssueId(this.renewForm.get('issueId').value)
        .subscribe(async (data: any) => {
          this.details = data;
          this.details = this.details.data;
          this.fine = this.details.fineAmount;

          this.success();
          await delay(1000);
          this.issueBookService
            .updateDueDate(this.renewForm.get('issueId').value)
            .subscribe(async (data) => {});
          this.renewForm.reset();
        });
    });
  }
  return() {
    this.router.navigate(['userfunctions']);
  }

  success() {
    this.toaster.success(
      'Book Renewal finished Successfully! You have fine amount RS.' +
        this.fine +
        ' for the issued book'
    );
  }
}
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
