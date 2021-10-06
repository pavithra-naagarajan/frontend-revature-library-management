import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  editBookForm: FormGroup;
  book: Observable<Book> | any;
  bookId?: number;
  adminId?: number
  constructor(public router: Router, public bookService: BookService,
     public activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,public toasterService:ToasterService) { }


  ngOnInit(): void {
    this.book = new Book()
    this.bookId = this.activatedRoute.snapshot.params['bookId'];
    this.adminId = localStorage.getItem('adminId') as any;


    this.bookService.getBookById(this.bookId)
      .subscribe(data => {

        this.book = data
        this.book = this.book.data

        this.editBookForm = this.formBuilder.group({
          bookId: [this.book.bookId],
          isbn: [this.book.isbn],
          bookName: [this.book.bookName, Validators.required],
          status: [this.book.status],
          updatedOn: [this.book.updatedOn],
          authorName: [this.book.authorName, Validators.required],
          publisher: [this.book.publisher, Validators.required],
          genre: [this.book.genre, Validators.required],
          volume: [this.book.volume, Validators.required],
          edition: [this.book.edition, Validators.required],
          createdOn: [this.book.createdOn],

        })
      })
  }


  updateBookDetails() {
    this.bookService.updateBook(this.editBookForm?.value)
      .subscribe(
        async response => {

          this.successNotification()
          await delay(600)
          this.router.navigate(['viewbooks'])
        });
  }
  return() {
    this.router.navigate(['adminfunctions'])
  }


  successNotification() {
    this.toasterService.info("Book details updated successfully!")
  }

}
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}