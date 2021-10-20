import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Book } from '../models/book';

const URL = 'http://localhost:9090/book';
@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(public http: HttpClient) {}
  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getBookByBookName(bookName: String): Observable<Book[]> {
    return this.http.get<Book[]>(`${URL}/bookname/${bookName}`);
  }
  getBookByPublisher(publisher: String): Observable<Book[]> {
    return this.http.get<Book[]>(`${URL}/publisher/${publisher}`);
  }

  getBookByAuthorName(authorName: String): Observable<Book[]> {
    return this.http.get<Book[]>(`${URL}/author/${authorName}`);
  }

  getBookByGenre(genre: String): Observable<Book[]> {
    return this.http.get<Book[]>(`${URL}/genre/${genre}`);
  }
  //get book by id
  getBookById(bookId: number): Observable<Book> {
    return this.http.get<Book>(`${URL}/${bookId}`);
  }
  getBookByISBN(isbn: number): Observable<Book> {
    return this.http.get<Book>(`${URL}/isbn/${isbn}`);
  }
  searchBook(value: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${URL}/searchbooks/${value}`);
  }

  //delete a book
  deleteBook(bookId: number): Observable<Book> {
    return this.http.delete(`${URL}/${bookId}`);
  }

  //add a book
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(URL, book, this.httpOptions);
  }
  //update a book
  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(URL, book);
  }

  //get all books
  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`http://localhost:9090/book`);
  }

  getAllBookGenre(): Observable<any> {
    return this.http.get(`${URL}/getbookgenre`);
  }
}
