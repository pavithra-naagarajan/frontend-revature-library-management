import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user';

import { retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const URL = "http://localhost:9090/user"
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http:HttpClient) { }
// Http Headers
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
   

  //get user by id
  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${URL}/${userId}`)
      
  }

  //get user by mailId
  getUserByMailId(mailId:string) :Observable<User> {
    return this.http.get<User>(`${URL}/mail/${mailId}`)
      
  }
  //get user by mobileNumber
  getUserByMobileNumber(mobileNumber:string) :Observable<User> {
    return this.http.get<User>(`${URL}/mobile/${mobileNumber}`)
      
  }
  
  //delete a user
  deleteUser(userId: number): Observable<User> {
    return this.http.delete(`${URL}/${userId}`)
      .pipe(
        retry(0),
        catchError(this.errorHandler)
      )
  }
  searchUser(value:string): Observable<User[]>{
    return this.http.get<User[]>(`${URL}/searchusers/${value}`)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }
  
  //user login

  userLogin(mailId:string,password:string): Observable<User> {
    return this.http.get<User>(`${URL}/login/${mailId}/${password}`)
      .pipe(
        retry(0),
        catchError(this.errorHandler)
      )
  }
//add a user
  addUser(user :User) :Observable<User>{
    return this.http.post<User>(URL,user,this.httpOptions).pipe(retry(0),
    catchError(this.errorHandler)
  );
  }
  //update a user
  updateUser(user :User): Observable<User> {
    return this.http.put<User>(URL, user)
      .pipe(
        retry(0),
        catchError(this.errorHandler)
      )
  }
  //change according to backend
  forgotPassword(mailId :string): Observable<User> {
    return this.http.put<User>(`${URL}/forgotpassword/${mailId}`,this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.errorHandler)
      )
  }

  //get all users
  getAllUsers() :Observable<User[]>{
    return this.http.get<User[]>(`http://localhost:9090/user`).pipe(retry(0),
    catchError(this.errorHandler)
);
  }
  getUserByRole(userRole:string) :Observable<User[]>{
    return this.http.get<User[]>(`${URL}/role/${userRole}`).pipe(retry(0),
    catchError(this.errorHandler)
);
  }

  getUserByName(firstName:string) :Observable<User[]>{
    return this.http.get<User[]>(`${URL}/name/${firstName}`).pipe(retry(0),
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




