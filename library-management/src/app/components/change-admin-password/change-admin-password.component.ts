import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Admin } from 'src/app/models/admin';
import { AdminService } from 'src/app/services/admin.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-change-admin-password',
  templateUrl: './change-admin-password.component.html',
  styleUrls: ['./change-admin-password.component.css'],
})
export class ChangeAdminPasswordComponent implements OnInit {
  passwordForm: FormGroup;
  admin: Observable<Admin> | any;
  mailId?: string;
  errorMessage: string;
  newPassword?: string;

  constructor(
    public router: Router,
    public adminService: AdminService,
    public formBuilder: FormBuilder,
    public toaster: ToasterService
  ) {}

  ngOnInit(): void {
    this.admin = new Admin();
    this.mailId = localStorage.getItem('adminEmail') as string;
    this.adminService.getAdminByMailId(this.mailId).subscribe((data) => {
      this.admin = data;
      this.admin = this.admin.data;
      this.passwordForm = this.formBuilder.group({
        password: [''],
        newPassword: ['', Validators.required],
      });
    });
  }

  changeAdminPassword() {
    this.adminService
      .changeAdminPassword(
        this.mailId,
        this.passwordForm.get('password').value,
        this.passwordForm.get('newPassword').value
      )
      .subscribe(
        async (data) => {
          this.toaster.success('Password changed successfully!');
          await delay(1000);
          this.router.navigate(['login']);
        },
        (error) => {
          this.errorMessage = error.error.message;
          this.toaster.error(' your old password is WRONG!!');
        }
      );
  }
}
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
