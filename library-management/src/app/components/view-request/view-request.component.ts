import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RequestBook } from 'src/app/models/request-book';
import { RequestBookService } from 'src/app/services/request-book.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.css']
})
export class ViewRequestComponent implements OnInit {

  show?:boolean;
  adminId?:number
  bookRequests:Observable<RequestBook>|any
  errorMessage: string;
  constructor(public router:Router,
    public requestBookService:RequestBookService,public activatedRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.adminId = localStorage.getItem('adminId') as any;

    this.viewRequestBooks();
  
  
  }

    successNotification(){
      Swal.fire('Success', 'Book request sent Successfully!', 'success')
    }
    viewRequestBooks() {
      this.requestBookService.getAllRequestBookDetails().subscribe(
        (res:any)=>{
         this.show=true
          this.bookRequests=res
          this.bookRequests=this.bookRequests.res
         
         if(res==null){
           this.errorMessage="No Records Found"
         }
         else{
          this.errorMessage="" 
         }
         
       }
      )}  
  approveRequest(userId:number,bookId:number,numberOfDays:number,requestId:number){
this.router.navigate(['issuebook',userId,bookId,numberOfDays,requestId])
  }
  return(){
    this.router.navigate(['adminfunctions'])
  }
}
