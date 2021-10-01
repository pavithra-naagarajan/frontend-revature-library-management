import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IssueBook } from '../models/issue-book';
import { User } from '../models/user';

const URL = "http://localhost:9090/issuebook"
@Injectable({
  providedIn: 'root'
})
export class IssueBookService {

  constructor(public http:HttpClient) { }
// Http Headers
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
   

  //get issue by issue id
  getIssueDetailsByIssueId(issueId: number): Observable<IssueBook> {
    return this.http.get<IssueBook>(`${URL}/issue/${issueId}`)
      
  }

  //get issue by userId
  getIssueDetailsByUserId(userId:number) :Observable<IssueBook[]> {
    return this.http.get<IssueBook[]>(`${URL}/user/${userId}`)
      
  }
  getIssueDetailsByBookId(bookId:number) :Observable<IssueBook> {
    return this.http.get<IssueBook>(`${URL}/book/${bookId}`)
      
  }

  getIssueDetailsByIssueDate(issueDate:Date) :Observable<IssueBook[]> {
    return this.http.get<IssueBook[]>(`${URL}/issuedate?issueDate=${issueDate}`)
      
  }

  getIssueDetailsByDueDate(dueDate:Date) :Observable<IssueBook[]> {
    return this.http.get<IssueBook[]>(`${URL}/duedate?dueDate=${dueDate}`)
      
  }

  


  //delete a issue
  deleteIssueDetails(issueId: number): Observable<IssueBook> {
    return this.http.delete(`${URL}/${issueId}`)
      .pipe(
        retry(0),
        catchError(this.errorHandler)
      )
  }
  

//add a issue
  addIssueDetails(issueBook :IssueBook) :Observable<IssueBook>{
    return this.http.post<IssueBook>(URL,issueBook,this.httpOptions).pipe(retry(0),
    catchError(this.errorHandler)
  );
  }
  //update a issue
  updateIssueDetails(issueBook :IssueBook): Observable<IssueBook> {
    return this.http.put<IssueBook>(URL, issueBook)
      .pipe(
        retry(0),
        catchError(this.errorHandler)
      )
  }
   //update fine amount
   updateFine(issueId :number): Observable<IssueBook> {
    return this.http.put<IssueBook>(`${URL}/updatefine/${issueId}`,this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.errorHandler)
      )
  }
  updateDueDate(issueId :number): Observable<IssueBook> {
    return this.http.put<IssueBook>(`${URL}/updateduedate/${issueId}`,this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.errorHandler)
      )
  }
 

  //get all issuedDetails
  getAllIssuedDetails() :Observable<IssueBook[]>{
    return this.http.get<IssueBook[]>(`http://localhost:9090/issuebook`).pipe(retry(0),
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




