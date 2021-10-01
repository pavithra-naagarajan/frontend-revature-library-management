import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Book } from '../models/book';


const URL = "http://localhost:9090/book"
@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(public http:HttpClient) { }
// Http Headers
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
   
getBookByBookName(bookName : String): Observable<Book[]>{
  return this.http.get<Book[]>(`${URL}/bookname/${bookName}`)
  .pipe(
    retry(1),
    catchError(this.errorHandler)
  )
}
getBookByPublisher(publisher : String): Observable<Book[]>{
  return this.http.get<Book[]>(`${URL}/publisher/${publisher}`)
  .pipe(
    retry(1),
    catchError(this.errorHandler)
  )
}


getBookByAuthorName(authorName : String): Observable<Book[]>{
  return this.http.get<Book[]>(`${URL}/author/${authorName}`)
  .pipe(
    retry(1),
    catchError(this.errorHandler)
  )
}

getBookByGenre(genre : String): Observable<Book[]>{
  return this.http.get<Book[]>(`${URL}/genre/${genre}`)
  .pipe(
    retry(1),
    catchError(this.errorHandler)
  )
}
  //get book by id
  getBookById(bookId: number): Observable<Book> {
    return this.http.get<Book>(`${URL}/${bookId}`)
      
  }
  getBookByISBN(isbn: number): Observable<Book> {
    return this.http.get<Book>(`${URL}/isbn/${isbn}`)
      
  }
  searchBook(value:string): Observable<Book[]>{
    return this.http.get<Book[]>(`${URL}/searchbooks/${value}`)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }
  
  //delete a book
  deleteBook(bookId: number): Observable<Book> {
    return this.http.delete(`${URL}/${bookId}`)
      .pipe(
        retry(0),
        catchError(this.errorHandler)
      )
  }
  
 
//add a book
  addBook(book :Book) :Observable<Book>{
    return this.http.post<Book>(URL,book,this.httpOptions).pipe(retry(0),
    catchError(this.errorHandler)
  );
  }
  //update a book
  updateBook(book :Book): Observable<Book> {
    return this.http.put<Book>(URL, book)
      .pipe(
        retry(0),
        catchError(this.errorHandler)
      )
  }

  //get all books
  getAllBooks() :Observable<Book[]>{
    return this.http.get<Book[]>(`http://localhost:9090/book`).pipe(retry(0),
    catchError(this.errorHandler)
);
  }

//Error Handler
errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else {
    // Get server-side message
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }

  switch (error.status) {
    case 200:    console.log("200's");

      break;
    case 401:
      break;
    case 403:
      break;
    case 0:
    case 400:
    case 405:
    case 406:
    case 409:
    case 500:
      break;
  }

  console.log(errorMessage);
  return throwError(errorMessage);
}


}




