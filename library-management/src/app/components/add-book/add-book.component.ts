import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BookService } from 'src/app/services/book.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit {
  addBookForm?: FormGroup;

  errorMessage: string;
  adminId?: number;
  genreValues: [number, string][] = [];
  constructor(
    public bookService: BookService,
    public formBuilder: FormBuilder,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public toasterService: ToasterService
  ) {}

  ngOnInit(): void {
    this.adminId = localStorage.getItem('adminId') as any;

    this.addBookForm = this.formBuilder.group({
      bookId: [-1],
      isbn: [-1],
      bookName: ['', Validators.required],
      authorName: ['', Validators.required],
      publisher: ['', Validators.required],
      genre: ['', Validators.required],
      volume: ['', Validators.required],
      edition: ['', Validators.required],
    });

    this.getGenreData();
  }

  addBookDetails() {
    this.bookService
      .addBook(this.addBookForm?.value)
      .subscribe(async (response) => {
        this.success();

        this.addBookForm.reset();
      });
  }

  return() {
    this.router.navigate(['adminfunctions']);
  }

  success() {
    this.toasterService.success('Book Addded successfully!');
  }

  getGenreData() {
    this.bookService.getAllBookGenre().subscribe((data) => {
      this.genreValues = data.data;
      console.log(this.genreValues);
    });
  }
}
