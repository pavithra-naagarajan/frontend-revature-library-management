import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';


@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.css']
})
export class SearchBookComponent implements OnInit {

  dataFound: boolean = true;
  errorMessage?: string;
  books: Book[] = [];


  searchBookForm?: FormGroup;
  textValue: any = null;
  value?: string
  mailId?: string;
  constructor(public bookService: BookService, public formBuilder: FormBuilder,
    public router: Router, public activatedRoute: ActivatedRoute) { }

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
      if (this.books == null) {
        this.errorMessage = "No records found"
      }
      else {
        this.errorMessage = ""
      }
    }, error => { this.errorMessage = "No records found" })

  }



  searchBook() {
    if (this.textValue == "") {
      this.refreshBooks()
    }

    else {
      this.bookService.searchBook(this.searchBookForm.get('value')?.value).subscribe((data: any[]) => {
      
        this.books = data;
        if (this.books == null) {
          this.errorMessage = "No records found"
        }
        else {
          this.errorMessage = ""
        }
      }, error => { this.errorMessage = "No records found" }
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
