import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueBook } from 'src/app/models/issue-book';
import { User } from 'src/app/models/user';
import { IssueBookService } from 'src/app/services/issue-book.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-view-issue',
  templateUrl: './user-view-issue.component.html',
  styleUrls: ['./user-view-issue.component.css']
})
export class UserViewIssueComponent implements OnInit {
  mailId?:string
  user?:User
  userId?:number
  issuedDetails:IssueBook[]=[]
  errorMessage?:string
  show?:boolean
  constructor(public router:Router,
    public issueBookService:IssueBookService,public userService:UserService,public formBuilder:FormBuilder
    ,public activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.mailId = localStorage.getItem('userEmail') as string;
    this.show=true
    this.getIssueByUserId();
  }

  getIssueByUserId(){
    {
    this.userService.getUserByMailId(this.mailId).subscribe(data=>{
      this.user=data

this.userId=this.user.userId
      this.issueBookService.getIssueDetailsByUserId(this.userId).subscribe((data:any[])=>{
     
        this.issuedDetails=data;
        if(this.issuedDetails == null){
          this.errorMessage = "No records found"
      }
      else{
        this.errorMessage = ""
        this.show=true
      }
      }, error => {this.errorMessage = "No records found"}
      )
  
    })
  }
  }
  return(){
    this.router.navigate(['userfunctions'])
  }
}
