import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IssueBook } from 'src/app/models/issue-book';
import { IssueBookService } from 'src/app/services/issue-book.service';

@Component({
  selector: 'app-view-more-issuedetails',
  templateUrl: './view-more-issuedetails.component.html',
  styleUrls: ['./view-more-issuedetails.component.css']
})
export class ViewMoreIssuedetailsComponent implements OnInit {

  issueId?:number;
  issuedDetails:Observable<IssueBook>|any
  constructor(public activatedRoute:ActivatedRoute,public issueBookService:IssueBookService,public router:Router) { }

  ngOnInit(): void {
    this.issueId = this.activatedRoute.snapshot.params['issueId'];
    this.issueBookService.getIssueDetailsByIssueId(this.issueId).subscribe(data=>{
      this.issuedDetails=data
      this.issuedDetails=this.issuedDetails.data
      
    })
  }
  return(){
    this.router.navigate(['viewissuedbooks'])
  }

}
