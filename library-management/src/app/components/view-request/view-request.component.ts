import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RequestBook } from 'src/app/models/request-book';
import { RequestBookService } from 'src/app/services/request-book.service';

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.css']
})
export class ViewRequestComponent implements OnInit {

  show?: boolean;
  adminId?: number
  bookRequests: Observable<RequestBook[]> | any
  errorMessage: string;
  config: any;
  constructor(public router: Router,
    public requestBookService: RequestBookService, public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.adminId = localStorage.getItem('adminId') as any;

    this.viewRequestBooks();


  }


  viewRequestBooks() {
    this.requestBookService.getAllRequestBookDetails().subscribe(
      (data: any[]) => {
        this.show = true
        this.bookRequests = data
        this.bookRequests = this.bookRequests.data
        
        if ( this.bookRequests == null) {
          this.show=false
          this.errorMessage = "No Records Found"
        }
        else {
          this.errorMessage = ""
        }
        this.config = {
          itemsPerPage: 3,
          currentPage: 1,
          totalItems: this.bookRequests.count
        };

      }
    )
  }


  pageChanged(event: any) {
    this.config.currentPage = event;
  }

  approveRequest(userId: number, bookId: number, numberOfDays: number, requestId: number) {
    this.router.navigate(['issuebook', userId, bookId, numberOfDays, requestId])
  }
  return() {
    this.router.navigate(['adminfunctions'])
  }
}
