import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Admin } from '../models/admin';

const URL = "http://localhost:9090/admin"
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(public http:HttpClient) { }
// Http Headers
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
   
//admin by role
getAdminByRole(adminRole : String): Observable<Admin[]>{
  return this.http.get<Admin[]>(`${URL}/role/${adminRole}`)
  .pipe(
    retry(1),
    catchError(this.errorHandler)
  )
}
getAdminById(adminId : number): Observable<Admin>{
  return this.http.get<Admin>(`${URL}/${adminId}`)
  .pipe(
    retry(1),
    catchError(this.errorHandler)
  )
}



  //adminlogin
  adminLogin(adminId: number,adminPassword:string): Observable<Admin> {
    return this.http.get<Admin>(`${URL}/login/${adminId}/${adminPassword}`)
      
  }
  
  
  //delete a admin
  deleteAdmin(adminId: number): Observable<Admin> {
    return this.http.delete(`${URL}/${adminId}`)
      .pipe(
        retry(0),
        catchError(this.errorHandler)
      )
  }
  
 
//add a admin
  addAdmin(admin :Admin) :Observable<Admin>{
    return this.http.post<Admin>(URL,admin,this.httpOptions).pipe(retry(0),
    catchError(this.errorHandler)
  );
  }
  //update a admin
  updateAdmin(admin :Admin): Observable<Admin> {
    return this.http.put<Admin>(URL, admin)
      .pipe(
        retry(0),
        catchError(this.errorHandler)
      )
  }

  //get all admins
  getAllAdmins() :Observable<Admin[]>{
    return this.http.get<Admin[]>(`http://localhost:9090/admin`).pipe(retry(0),
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




