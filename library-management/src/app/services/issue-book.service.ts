import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IssueBook } from '../models/issue-book';
import { User } from '../models/user';

const URL = 'http://localhost:9090/issuebook';
@Injectable({
  providedIn: 'root',
})
export class IssueBookService {
  constructor(public http: HttpClient) {}
  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  //get issue by issue id
  getIssueDetailsByIssueId(issueId: number): Observable<IssueBook> {
    return this.http.get<IssueBook>(`${URL}/issue/${issueId}`);
  }

  //get issue by userId
  getIssueDetailsByUserId(userId: number): Observable<IssueBook[]> {
    return this.http.get<IssueBook[]>(`${URL}/user/${userId}`);
  }
  getIssueDetailsByBookId(bookId: number): Observable<IssueBook> {
    return this.http.get<IssueBook>(`${URL}/book/${bookId}`);
  }

  getIssueDetailsByIssueDate(issueDate: Date): Observable<IssueBook[]> {
    return this.http.get<IssueBook[]>(
      `${URL}/issuedate?issueDate=${issueDate}`
    );
  }

  getIssueDetailsByDueDate(dueDate: Date): Observable<IssueBook[]> {
    return this.http.get<IssueBook[]>(`${URL}/duedate?dueDate=${dueDate}`);
  }

  //delete a issue
  deleteIssueDetails(issueId: number): Observable<IssueBook> {
    return this.http.delete(`${URL}/${issueId}`);
  }

  //add a issue
  addIssueDetails(
    issueBook: IssueBook,
    numberOfDays: number
  ): Observable<IssueBook> {
    return this.http.post<IssueBook>(
      `${URL}/${numberOfDays}`,
      issueBook,
      this.httpOptions
    );
  }
  //update a issue
  updateIssueDetails(issueBook: IssueBook): Observable<IssueBook> {
    return this.http.put<IssueBook>(URL, issueBook);
  }
  //update fine amount
  updateFine(issueId: number): Observable<IssueBook> {
    return this.http.put<IssueBook>(
      `${URL}/updatefine/${issueId}`,
      this.httpOptions
    );
  }
  updateDueDate(issueId: number): Observable<IssueBook> {
    return this.http.put<IssueBook>(
      `${URL}/updateduedate/${issueId}`,
      this.httpOptions
    );
  }

  //get all issuedDetails
  getAllIssuedDetails(): Observable<IssueBook[]> {
    return this.http.get<IssueBook[]>(`http://localhost:9090/issuebook`);
  }
}
