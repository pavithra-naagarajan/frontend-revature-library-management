import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, ObservableInput } from 'rxjs';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.css'],
})
export class SearchBookComponent implements OnInit {
  errorMessage?: string;
  books: Observable<Book[]> | any;
  config: any;
  searchBookForm?: FormGroup;
  textValue: any = null;
  value?: string;
  mailId?: string;
  show: boolean;
  constructor(
    public bookService: BookService,
    public formBuilder: FormBuilder,
    public router: Router,
    public toaster: ToasterService
  ) {}

  ngOnInit(): void {
    this.mailId = localStorage.getItem('userEmail') as string;
    this.refreshBooks();

    this.searchBookForm = this.formBuilder.group({
      value: ['', Validators.required],
    });
  }

  refreshBooks() {
    this.bookService.getAllBooks().subscribe(
      (data: any[]) => {
        this.books = data;
        this.books = this.books.data;

        this.show = true;
        this.errorMessage = '';

        this.config = {
          itemsPerPage: 3,
          currentPage: 1,
          totalItems: this.books.count,
        };
      },
      (error) => {
        this.show = false;
        this.errorMessage = error.error.message;
      }
    );
  }
  pageChanged(event: any) {
    this.config.currentPage = event;
  }

  searchBook() {
    if (this.textValue == '') {
      this.refreshBooks();
    } else {
      this.bookService
        .searchBook(this.searchBookForm.get('value')?.value)
        .subscribe(
          (data: any[]) => {
            this.books = data;
            this.books = this.books.data;

            this.show = true;
            this.errorMessage = '';
          },

          (error) => {
            this.show = false;
            this.errorMessage = error.error.message;
          }
        );
    }
  }

  requestBook(bookId: number) {
    this.router.navigate(['requestbook', bookId]);
  }
  issueNotification() {
    this.toaster.error('This book is already Issued!');
  }
  requestNotification() {
    this.toaster.error('This book is already Requested!');
  }
}
