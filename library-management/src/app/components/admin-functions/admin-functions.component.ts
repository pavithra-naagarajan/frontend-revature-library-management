import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueBook } from 'src/app/models/issue-book';
import { IssueBookService } from 'src/app/services/issue-book.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-functions',
  templateUrl: './admin-functions.component.html',
  styleUrls: ['./admin-functions.component.css']
})
export class AdminFunctionsComponent implements OnInit {

  adminId?: number
  issuedDetails: IssueBook[] = [];
  index?: number
  constructor(public router: Router, public activatedRoute: ActivatedRoute, public issueBookService: IssueBookService) { }

  ngOnInit(): void {
    this.adminId = localStorage.getItem('adminId') as any;

  }

  viewAdminProfile() {
    this.router.navigate(['editadmin'])
  }
  viewUsers() {
    this.router.navigate(['viewusers'])

  }
  viewBooks() {
    this.router.navigate(['viewbooks'])

  }
  addBooks() {
    this.router.navigate(['addbooks'])

  }
  viewRequest() {
    this.router.navigate(['viewrequest'])

  }
  viewIssuedDetails() {
    this.router.navigate(['viewissuedbooks'])

  }

 /*  updateFine() {
    this.issueBookService.getAllIssuedDetails().subscribe(data => {
      this.issuedDetails = data
      console.log(this.issuedDetails)
      for (this.index = 0; this.index < this.issuedDetails.length; this.index++) {
        console.log(this.issuedDetails[this.index].dueDate)
        console.log(this.issuedDetails[this.index].dueDate.getTime)
        console.log(new Date(this.issuedDetails[this.index].dueDate).getTime())
        console.log(new Date().getTime())
        if ((new Date(this.issuedDetails[this.index].dueDate).getTime()) < new Date().getTime()) {

          this.issueBookService.updateFine(this.issuedDetails[this.index].issueId).subscribe(data => {
            console.log("fine updated :" + data)

          }, error => {
            this.successNotification()
          })

        }
        else {
         
        }
      }
    })

  } */


  logout(){
    localStorage.removeItem('adminId');

    this.router.navigate(['login'])

  }
  successNotification() {
    Swal.fire('Success', 'Fine Updated Successfully!', 'success')
  }


}
