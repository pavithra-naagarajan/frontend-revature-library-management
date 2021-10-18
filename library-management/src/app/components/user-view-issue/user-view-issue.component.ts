import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IssueBook } from 'src/app/models/issue-book';
import { User } from 'src/app/models/user';
import { IssueBookService } from 'src/app/services/issue-book.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-view-issue',
  templateUrl: './user-view-issue.component.html',
  styleUrls: ['./user-view-issue.component.css'],
})
export class UserViewIssueComponent implements OnInit {
  mailId?: string;
  user: Observable<User> | any;
  userId?: number;
  issuedDetails: Observable<IssueBook[]> | any;
  errorMessage?: string;
  show?: boolean;
  config: any;
  url: any;
  constructor(
    public router: Router,
    public issueBookService: IssueBookService,
    public userService: UserService,
    public formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.mailId = localStorage.getItem('userEmail') as string;
    this.show = true;
    this.getIssueByUserId();
  }

  pageChanged(event: any) {
    this.config.currentPage = event;
  }

  getIssueByUserId() {
    {
      this.userService.getUserByMailId(this.mailId).subscribe((data) => {
        this.user = data;
        this.user = this.user.data;
        this.userId = this.user.userId;
        this.issueBookService.getIssueDetailsByUserId(this.userId).subscribe(
          (data: any[]) => {
            this.issuedDetails = data;
            this.issuedDetails = this.issuedDetails.data;

            this.errorMessage = '';
            this.show = true;

            this.config = {
              itemsPerPage: 3,
              currentPage: 1,
              totalItems: this.issuedDetails.count,
            };
          },
          (error) => {
            this.errorMessage = 'No records found';
          }
        );
      });
    }
  }

  generatePdf(issueId: number) {
    this.url = `http://localhost:9090/issuebook/generatepdf` + `/${issueId}`;
  }
}
