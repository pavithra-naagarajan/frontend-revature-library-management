import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-books',
  templateUrl: './view-books.component.html',
  styleUrls: ['./view-books.component.css']
})
export class ViewBooksComponent implements OnInit {

  show?: boolean;
  books:Observable<Book[]>|any

  value?: string

  textValue: any = null;
  errorMessage?: string
  searchBookForm?: FormGroup

  adminId?: number
  constructor(public router: Router, public bookService: BookService, public formBuilder: FormBuilder, public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.adminId = localStorage.getItem('adminId') as any;

    this.viewBooks()

    this.searchBookForm = this.formBuilder.group({
      value: ['', Validators.required]
    })


  }
  editBook(bookId: number) {
    this.router.navigate(['editbook', bookId])
  }
  viewBooks() {
    this.bookService.getAllBooks().subscribe(
      (res: any) => {
        this.show = true
        this.books = res
        this.books = this.books.res
      }
    )
  }




  return() {
    this.router.navigate(['adminfunctions'])
  }
  deleteBook(bookId: number) {
    this.bookService.deleteBook(bookId).subscribe(
      (res: any) => {

      });
  }

  deleteAlertConfirmation(userId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think'
    }).then((result) => {
      if (result.value) {
        this.deleteBook(userId)
        Swal.fire(
          'Removed!',
          'Book deleted successfully!',
          'success'
        )
        this.viewBooks()
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Book Not Deleted!',
          'error'
        )
      }
    })
  }



  searchBook() {
    if (this.textValue == "") {
      this.viewBooks()
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
}

