import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Admin } from 'src/app/models/admin';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:Observable<User>|any
  admin:Observable<Admin>|any
  constructor(private router: Router, public userService: UserService, public adminService: AdminService) { }

  ngOnInit(): void {

  }

  async onLogin(credential: any) {
    this.adminService.getAdminById(credential.username).subscribe(data => {
      this.admin = data
      this.admin=this.admin.data
      console.log(this.admin.adminPassword)
    
    })
    this.userService.getUserByMailId(credential.username).subscribe(data => {
      this.user = data
      this.user=this.user.data
      console.log(this.user.password)
  })

    await delay(1500);
    this.check(credential);
  }
  async check(credential: any) {
    if (credential.username == '1' && credential.password == 'admin1111') {

      
      this.successNotification()
      this.router.navigate(['viewadmins']);
    } else if (this.user != null && this.user.password==credential.password ) {
      this.successNotification()
      localStorage.setItem('userEmail',credential.username);
      this.router.navigate(['searchbooks']);
    } else if (this.admin != null && this.admin.adminPassword==credential.password ) {
      this.successNotification()
      localStorage.setItem('adminId',credential.username);
      this.router.navigate(['viewusers']);
    }
    else{
      this.WrongLoginNotification()
      await delay(500)
      window.location.reload()
    }
  }


  successNotification() {
    Swal.fire('Success', 'Login Success!', 'success')
  }
  WrongLoginNotification() {
    Swal.fire('WRONG', 'Check Username and Password', 'error')
  }
}
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}