import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { analyzeAndValidateNgModules } from '@angular/compiler';

const URL = 'http://localhost:9090/user';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(public http: HttpClient) {}
  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  //get user by id
  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${URL}/${userId}`);
  }

  //get user by mailId
  getUserByMailId(mailId: string): Observable<User> {
    return this.http.get<User>(`${URL}/mail/${mailId}`);
  }
  //get user by mobileNumber
  getUserByMobileNumber(mobileNumber: string): Observable<User> {
    return this.http.get<User>(`${URL}/mobile/${mobileNumber}`);
  }

  //delete a user
  deleteUser(userId: number): Observable<User> {
    return this.http.delete(`${URL}/${userId}`);
  }
  searchUser(value: string): Observable<User[]> {
    return this.http.get<User[]>(`${URL}/searchusers/${value}`);
  }

  //user login

  userLogin(mailId: string, password: string): Observable<User> {
    return this.http.get<User>(`${URL}/login/${mailId}/${password}`);
  }
  //add a user
  addUser(user: User): Observable<User> {
    return this.http.post<User>(URL, user, this.httpOptions);
  }
  //update a user
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(URL, user);
  }

  forgotPassword(mailId: string): Observable<User> {
    return this.http.put<User>(
      `${URL}/forgotpassword/${mailId}`,
      this.httpOptions
    );
  }

  // http://localhost:9090/user/changepassword/pavithra.n@revature.com/560429/pavi123
  //change user password
  changeUserPassword(mailId: string, password: string, newPassword: string) {
    console.log('service');
    return this.http.put(
      `${URL}/changepassword/${mailId}/${password}/${newPassword}`,
      this.httpOptions
    );
  }

  //get all users
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:9090/user`);
  }
  getUserByRole(userRole: string): Observable<User[]> {
    return this.http.get<User[]>(`${URL}/role/${userRole}`);
  }

  getUserByName(firstName: string): Observable<User[]> {
    return this.http.get<User[]>(`${URL}/name/${firstName}`);
  }
}
