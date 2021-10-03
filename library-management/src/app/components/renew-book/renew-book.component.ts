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
  selector: 'app-renew-book',
  templateUrl: './renew-book.component.html',
  styleUrls: ['./renew-book.component.css']
})
export class RenewBookComponent implements OnInit {
  mailId?: string
  renewForm?: FormGroup
  details: Observable<IssueBook[]> | any
  user: Observable<User> | any
  userId?: number
  fine?: number
  constructor(public router: Router, public userService: UserService, public issueBookService: IssueBookService,

    public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.mailId = localStorage.getItem('userEmail') as string;
    this.userService.getUserByMailId(this.mailId).subscribe(data => {

      this.user = data
      this.user = this.user.data
      this.userId = this.user.userId
      this.issueBookService.getIssueDetailsByUserId(this.userId).subscribe((data: any[]) => {

        this.details = data
        this.details = this.details.data
      })
    })
    this.renewForm = this.formBuilder.group({
      issueId: ['', Validators.required],


    })


  }
  renewBook() {
    this.updateFine(this.renewForm.get('issueId').value)

  }


  updateFine(issueId: number) {

    this.issueBookService.updateFine(issueId).subscribe(data => {
      this.issueBookService.getIssueDetailsByIssueId(this.renewForm.get('issueId').value).subscribe(async (data: any) => {
        this.details = data
        this.details = this.details.data
        this.fine = this.details.fineAmount
       
        await delay(1000)
        this.successNotification()
        await delay(1000)
        this.issueBookService.updateDueDate(this.renewForm.get('issueId').value).subscribe(async data => {


        })
        this.router.navigate(['userfunctions'])
      })

    }
    )

  }
  return() {
    this.router.navigate(['userfunctions'])
  }
  successNotification() {
    Swal.fire('Success', 'Book Renewal finished Successfully! You have fine amount RS.' + this.fine + ' for the issued book', 'success')
  }
}
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
