import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book';
import { IssueBook } from 'src/app/models/issue-book';
import { User } from 'src/app/models/user';
import { BookService } from 'src/app/services/book.service';
import { IssueBookService } from 'src/app/services/issue-book.service';
import { RequestBookService } from 'src/app/services/request-book.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-issue-book',
  templateUrl: './issue-book.component.html',
  styleUrls: ['./issue-book.component.css']
})
export class IssueBookComponent implements OnInit {

  bookId?: number
  userId?: number
  book: Observable<Book> | any;
  user: Observable<User> | any;
  issueBook?: IssueBook;
  issueForm?: FormGroup
  numberOfDays?: number
  requestId?: number
  errorMessage?: string;
  calculateDays?: number
  totalDays?: number;
  days?: number
  adminId?: number
  minDate = new Date();
  constructor(public router: Router, public bookService: BookService, public issueBookService: IssueBookService,
    public userService: UserService, public activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder, public requestBookService: RequestBookService,
    public toasterService:ToasterService) { }

  ngOnInit(): void {
    this.adminId = localStorage.getItem('adminId') as any;

    this.book = new Book()
    this.user = new User()
    this.issueBook = new IssueBook()
    this.bookId = this.activatedRoute.snapshot.params['bookId'];
    this.userId = this.activatedRoute.snapshot.params['userId'];
    this.numberOfDays = this.activatedRoute.snapshot.params['numberOfDays'];
    this.requestId = this.activatedRoute.snapshot.params['requestId'];

    this.bookService.getBookById(this.bookId).
      subscribe(data => {

        this.book = data
        this.book = this.book.data

      })

    this.userService.getUserById(this.userId).subscribe((data: User) => {

      this.user = data
      this.user = this.user.data

    })


    this.issueForm = this.formBuilder.group({

      issueDate: ['', Validators.required],
      dueDate: ['', Validators.required],

    })

  }
  addDays(days: number): Date {
    var futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + days);
    return futureDate;
  }

  addIssueBook() {
    this.issueBook.book = this.book
    this.issueBook.user = this.user
    this.issueBook.issueDate = this.issueForm?.get('issueDate').value
    this.issueBook.issueId = -1
    this.issueBook.fineAmount = 0
    this.issueBookService.addIssueDetails(this.issueBook, this.numberOfDays).subscribe(
      async response => {
        this.requestBookService.deleteRequestBookDetails(this.requestId).subscribe(response => {

        })
        this.successNotification();
        await delay(1000)
        this.router.navigate(['adminfunctions'])

      })


  }



  return() {
    this.router.navigate(['adminfunctions'])
  }

  successNotification() {
    this.toasterService.success( 'Book issued Successfully!')
  }


}
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
