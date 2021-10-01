import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  details?: IssueBook[] = []
  user?: User
  userId?: number
  constructor(public router: Router, public userService: UserService, public issueBookService: IssueBookService,
    public activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.mailId = localStorage.getItem('userEmail') as string;
    this.userService.getUserByMailId(this.mailId).subscribe(data => {
     
      this.user = data
      this.userId = this.user.userId
      this.issueBookService.getIssueDetailsByUserId(this.userId).subscribe(res => {
        
        this.details = res
      })
    })



    this.renewForm = this.formBuilder.group({
   issueId: ['', Validators.required],
      

    })


  }
  renewBook() {
    
   

    this.issueBookService.updateDueDate(this.renewForm.get('issueId').value).subscribe(data => {

    }, error => {
      this.successNotification()
    })
  }
  return() {
    this.router.navigate(['userfunctions'])
  }
  successNotification() {
    Swal.fire('Success', 'Book Renewal finished Successfully!', 'success')
  }
}

