import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Admin } from 'src/app/models/admin';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/services/admin.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: Observable<User> | any;
  admin: Observable<Admin> | any;
  hide?: boolean;
  constructor(
    private router: Router,
    public userService: UserService,
    public adminService: AdminService,
    public toaster: ToasterService
  ) {}

  ngOnInit(): void {}

  async onLogin(credential: any) {
    this.adminService
      .adminLogin(credential.username, credential.password)
      .subscribe((data) => {
        this.admin = data;
        this.admin = this.admin.data;
        console.log(this.admin.adminPassword);
      });
    this.userService
      .userLogin(credential.username, credential.password)
      .subscribe((data) => {
        this.user = data;
        this.user = this.user.data;
        console.log(this.user.password);
      });

    await delay(1500);
    this.check(credential);
  }
  async check(credential: any) {
    if (
      credential.username == 'pavithra@gmail.com' &&
      credential.password == 'admin1111'
    ) {
      this.successNotification();
      await delay(1000);
      this.router.navigate(['viewadmins']);
    } else if (this.user != null) {
      this.successNotification();
      localStorage.setItem('userEmail', credential.username);
      await delay(1000);
      this.router.navigate(['searchbooks']);
    } else if (this.admin != null) {
      this.successNotification();
      localStorage.setItem('adminEmail', credential.username);
      await delay(1000);
      this.router.navigate(['viewusers']);
    } else {
      this.WrongLoginNotification();
      await delay(1000);
      //window.location.reload();
    }
  }

  successNotification() {
    this.toaster.success('Login Success');
  }
  WrongLoginNotification() {
    this.toaster.error('Check Username and Password');
  }
}
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
