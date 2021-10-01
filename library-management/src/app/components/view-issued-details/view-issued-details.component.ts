import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueBook } from 'src/app/models/issue-book';
import { IssueBookService } from 'src/app/services/issue-book.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-issued-details',
  templateUrl: './view-issued-details.component.html',
  styleUrls: ['./view-issued-details.component.css']
})


export class ViewIssuedDetailsComponent implements OnInit {
  selectedSort: String = "any";
  show?: boolean;
  issuedDetails: IssueBook[] = []

  dueDate?: Date
  issueDate?: Date
  searchBy: String = "default";
  textValue: any = null;
  errorMessage?: string

  searchByIssueDate?: FormGroup
  searchByDueDate?: FormGroup
  adminId?: number
  constructor(public router: Router,
    public issueBookService: IssueBookService, public formBuilder: FormBuilder, public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.adminId = localStorage.getItem('adminId') as any;

    this.viewIssuedBooks();

    this.searchByIssueDate = this.formBuilder.group({
      issueDate: ['', Validators.required]
    })

    this.searchByDueDate = this.formBuilder.group({
      dueDate: ['', Validators.required]
    })

  }

  successNotification() {
    Swal.fire('Success', 'Book request sent Successfully!', 'success')
  }
  successFineNotification() {
    Swal.fire('Success', 'Fine Amount updated Successfully!', 'success')

  }
  viewIssuedBooks() {
    this.issueBookService.getAllIssuedDetails().subscribe(
      (res: any) => {
        this.show = true
        this.issuedDetails = res

      }
    )
  }


  getByDueDate() {

    if (this.textValue == "") {
      this.viewIssuedBooks()
    }

    else {
      this.issueBookService.getIssueDetailsByDueDate(this.searchByDueDate.get('dueDate')?.value).subscribe((data: any[]) => {

        this.issuedDetails = data;
        if (this.issuedDetails == null) {
          this.errorMessage = "No records found"
        }
        else {
          this.errorMessage = ""
        }
      }, error => { this.errorMessage = "No records found" }
      )
    }
  }
  getByIssueDate() {

    if (this.textValue == "") {
      this.viewIssuedBooks()
    }

    else {
      this.issueBookService.getIssueDetailsByIssueDate(this.searchByIssueDate.get('issueDate')?.value).subscribe((data: any[]) => {


        this.issuedDetails = data;
        if (this.issuedDetails == null) {
          this.errorMessage = "No records found"
        }
        else {
          this.errorMessage = ""
        }
      }, error => { this.errorMessage = "No records found" }
      )
    }
  }

  return() {
    this.router.navigate(['adminfunctions'])
  }




}
