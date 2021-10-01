import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { RequestBook } from '../models/request-book';

const URL = "http://localhost:9090/requestbook"
@Injectable({
  providedIn: 'root'
})
export class RequestBookService {

  constructor(public http:HttpClient) { }
// Http Headers
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
   

/*   //get issue by issue id
  getIssueDetailsByIssueId(issueId: number): Observable<IssueBook> {
    return this.http.get<IssueBook>(`${URL}/${issueId}`)
      
  }

  //get issue by userId
  getIssueDetailsByUserId(userId:number) :Observable<IssueBook> {
    return this.http.get<IssueBook>(`${URL}/user/${userId}`)
      
  }
  getIssueDetailsByBookId(bookId:number) :Observable<IssueBook> {
    return this.http.get<IssueBook>(`${URL}/book/${bookId}`)
      
  } */

/*   getIssueDetailsByIssueDate(issueDate:Date) :Observable<IssueBook> {
    return this.http.get<IssueBook>(`${URL}?issueDate=${issueDate}`)
      
  }

  getRequestBookDetailsByDueDate(dueDate:Date) :Observable<IssueBook> {
    return this.http.get<IssueBook>(`${URL}?dueDate=${dueDate}`)
      
  } */
//get request by Id
getIssueDetailsByRequestId(requestId:number) :Observable<RequestBook> {
  return this.http.get<RequestBook>(`${URL}/user/${requestId}`)
}

  //delete a requestBook
  deleteRequestBookDetails(requestId: number): Observable<RequestBook> {
    return this.http.delete(`${URL}/${requestId}`)
      .pipe(
        retry(0),
        catchError(this.errorHandler)
      )
  }
  

//add a request book
  addRequestBookDetails(requestBook :RequestBook) :Observable<RequestBook>{
    return this.http.post<RequestBook>(URL,requestBook,this.httpOptions).pipe(retry(0),
    catchError(this.errorHandler)
  );
  }
  //update a request
  updateRequestBookDetails(requestBook :RequestBook): Observable<RequestBook> {
    return this.http.put<RequestBook>(URL, requestBook)
      .pipe(
        retry(0),
        catchError(this.errorHandler)
      )
  }

  //get all RequestBookDetails
  getAllRequestBookDetails() :Observable<RequestBook[]>{
    return this.http.get<RequestBook[]>(`http://localhost:9090/requestbook`).pipe(retry(0),
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



