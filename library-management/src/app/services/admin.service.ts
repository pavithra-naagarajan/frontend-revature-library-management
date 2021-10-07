import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Admin } from '../models/admin';

const URL = 'http://localhost:9090/admin';
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(public http: HttpClient) {}
  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  //admin by role
  getAdminByRole(adminRole: String): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${URL}/role/${adminRole}`);
  }
  //get admin by Id
  getAdminById(adminId: number): Observable<Admin> {
    return this.http.get<Admin>(`${URL}/${adminId}`);
  }

  //adminlogin
  adminLogin(adminId: number, adminPassword: string): Observable<Admin> {
    return this.http.get<Admin>(`${URL}/login/${adminId}/${adminPassword}`);
  }

  //delete a admin
  deleteAdmin(adminId: number): Observable<Admin> {
    return this.http.delete(`${URL}/${adminId}`);
  }

  //add a admin
  addAdmin(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(URL, admin, this.httpOptions);
  }
  //update a admin
  updateAdmin(admin: Admin): Observable<Admin> {
    return this.http.put<Admin>(URL, admin);
  }

  //get all admins
  getAllAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(`http://localhost:9090/admin`);
  }
}
