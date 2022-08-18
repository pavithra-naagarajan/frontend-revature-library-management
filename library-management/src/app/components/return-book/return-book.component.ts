import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IssueBook } from 'src/app/models/issue-book';
import { User } from 'src/app/models/user';
import { IssueBookService } from 'src/app/services/issue-book.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-return-book',
  templateUrl: './return-book.component.html',
  styleUrls: ['./return-book.component.css'],
})
export class ReturnBookComponent implements OnInit {
  mailId?: string;
  returnForm?: FormGroup;
  issueDetails: Observable<IssueBook> | any;
  fine: number;

  details: Observable<IssueBook[]> | any;
  user: Observable<User> | any;
  userId?: number;
  constructor(
    public router: Router,
    public userService: UserService,
    public issueBookService: IssueBookService,
    public activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder
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
    this.returnForm = this.formBuilder.group({
      issueId: ['', Validators.required],
    });
  }
  returnBook() {
    this.updateFine(this.returnForm.get('issueId').value);
  }
  updateFine(issueId: number) {
    this.issueBookService.updateFine(issueId).subscribe((data) => {
      this.issueBookService
        .getIssueDetailsByIssueId(this.returnForm.get('issueId').value)
        .subscribe(async (data: any) => {
          this.issueDetails = data;
          this.issueDetails = this.issueDetails.data;
          this.fine = this.issueDetails.fineAmount;

          await delay(1000);
          this.successNotification();
          await delay(1000);

          this.issueBookService
            .deleteIssueDetails(this.returnForm.get('issueId').value)
            .subscribe((data) => {});
          this.returnForm.reset();
        });
    });
  }

  return() {
    this.router.navigate(['userfunctions']);
  }
  successNotification() {
    Swal.fire(
      'Success',
      'You have fine amount RS.' +
        this.fine +
        ' for the issued book.Please ensure that you have paid fine after returning the book!',
      'success'
    );
  }
}
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
