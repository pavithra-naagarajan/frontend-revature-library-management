import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  user?: User
  admin?: Admin
  constructor(private router: Router, public userService: UserService, public adminService: AdminService) { }

  ngOnInit(): void {

  }

  async onLogin(credential: any) {
    this.adminService.getAdminById(credential.username).subscribe(response => {
      this.admin = response
    },error=>{
      console.log(error)
    })
    this.userService.getUserByMailId(credential.username).subscribe(data => {
      this.user = data
  },error=>{
    console.log(error)
  })

    await delay(1500);
    this.check(credential);
  }
  check(credential: any) {
    if (credential.username == '1' && credential.password == 'admin1111') {

      
      this.successNotification()
      this.router.navigate(['superadmin']);
    } else if (this.user != null) {
      this.successNotification()
      localStorage.setItem('userEmail',credential.username);
      this.router.navigate(['userfunctions']);
    } else if (this.admin != null) {
      this.successNotification()
      localStorage.setItem('adminId',credential.username);
      this.router.navigate(['adminfunctions']);
    }
    else if (this.user == null && this.admin == null) {
      this.WrongLoginNotification()
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