import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-functions',
  templateUrl: './user-functions.component.html',
  styleUrls: ['./user-functions.component.css']
})
export class UserFunctionsComponent implements OnInit {
mailId?:string;
  constructor(public router:Router,public activatedRoute:ActivatedRoute,) { }

  ngOnInit(): void {
    this.mailId = localStorage.getItem('userEmail') as string;

    
  }
  view(){
   
    this.router.navigate(['edituser'])
  }
 
  searchBooks(){
    this.router.navigate(['searchbooks'])
  }
  viewIssueDetails(){
    this.router.navigate(['viewissue'])

  }
  returnBook(){
    this.router.navigate(['returnbook'])

  }
  renewBook(){
    this.router.navigate(['renewbook'])
  }
  logout(){
    localStorage.removeItem('userEmail');
    this.router.navigate(['login'])

  }

}
