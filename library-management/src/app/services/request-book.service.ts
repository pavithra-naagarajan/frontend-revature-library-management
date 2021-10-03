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

  constructor(public http: HttpClient) { }
  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  //get request by Id
  getIssueDetailsByRequestId(requestId: number): Observable<RequestBook> {
    return this.http.get<RequestBook>(`${URL}/user/${requestId}`)
  }

  //delete a requestBook
  deleteRequestBookDetails(requestId: number): Observable<RequestBook> {
    return this.http.delete(`${URL}/${requestId}`)

  }


  //add a request book
  addRequestBookDetails(requestBook: RequestBook): Observable<RequestBook> {
    return this.http.post<RequestBook>(URL, requestBook, this.httpOptions)

  }
  //update a request
  updateRequestBookDetails(requestBook: RequestBook): Observable<RequestBook> {
    return this.http.put<RequestBook>(URL, requestBook)

  }

  //get all RequestBookDetails
  getAllRequestBookDetails(): Observable<RequestBook[]> {
    return this.http.get<RequestBook[]>(`http://localhost:9090/requestbook`)

  }



}



