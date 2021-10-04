import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, ObservableInput } from 'rxjs';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';


@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.css']
})
export class SearchBookComponent implements OnInit {

 
  errorMessage?: string;
  books: Observable<Book[]> | any
  config: any
  searchBookForm?: FormGroup;
  textValue: any = null;
  value?: string
  mailId?: string;
  show: boolean;
  constructor(public bookService: BookService, public formBuilder: FormBuilder,
    public router: Router) { }

  ngOnInit(): void {

    this.mailId = localStorage.getItem('userEmail') as string;
    this.refreshBooks()

    this.searchBookForm = this.formBuilder.group({
      value: ['', Validators.required]
    })


  }




  refreshBooks() {
    this.bookService.getAllBooks().subscribe((data: any[]) => {

      this.books = data
      this.books = this.books.data
    
      if (this.books == null) {
        this.show=false
        this.errorMessage = "No records found"
      }
      else {
        this.show=true
        this.errorMessage = ""
      }
      this.config = {
        itemsPerPage: 3,
        currentPage: 1,
        totalItems: this.books.count
      };
    })

  }
  pageChanged(event: any) {
    this.config.currentPage = event;
  }


  searchBook() {
    if (this.textValue == "") {
      this.refreshBooks()
    }

    else {
      this.bookService.searchBook(this.searchBookForm.get('value')?.value).subscribe((data: any[]) => {

        this.books = data;
        this.books = this.books.data
        if (this.books == null) {
          this.show=false
          this.errorMessage = "No records found"
        }
        else {
          this.show=true
          this.errorMessage = ""
        }
        
      }
      )
    }
  }

  requestBook(bookId: number) {
    this.router.navigate(['requestbook', bookId])
  }
  return() {

    this.router.navigate(['userfunctions'])
  }




}
