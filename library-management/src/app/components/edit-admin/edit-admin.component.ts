import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Admin } from 'src/app/models/admin';
import { AdminService } from 'src/app/services/admin.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css'],
})
export class EditAdminComponent implements OnInit {
  editAdminForm: FormGroup;
  updatePasswordForm: FormGroup;
  admin: Observable<Admin> | any;
  mailId?: string;
  showpassword?: boolean;
  constructor(
    public router: Router,
    public adminService: AdminService,
    public formBuilder: FormBuilder,
    public toaster: ToasterService
  ) {}

  ngOnInit(): void {
    this.admin = new Admin();
    this.mailId = localStorage.getItem('adminEmail') as any;

    this.adminService.getAdminByMailId(this.mailId).subscribe((data) => {
      this.admin = data;
      this.admin = this.admin.data;
      this.editAdminForm = this.formBuilder.group({
        adminId: [this.admin.adminId],
        adminName: [this.admin.adminName, [Validators.required]],
        adminPassword: [this.admin.adminPassword],

        adminRole: [this.admin.adminRole],
        updatedOn: [this.admin.updatedOn],
        createdOn: [this.admin.createdOn],
        mailId: [this.admin.mailId, [Validators.required, Validators.email]],
      });
    });
  }

  updatePassword() {
    this.showpassword = true;
    console.log('show');
  }
  updateAdminPassword() {
    console.log('password updated');
  }
  updateAdminDetails() {
    this.adminService
      .updateAdmin(this.editAdminForm?.value)
      .subscribe(async (response) => {
        this.successNotification();
        await delay(500);
        this.router.navigate(['adminfunctions']);
      });
  }
  return() {
    this.router.navigate(['adminfunctions']);
  }

  successNotification() {
    this.toaster.info('Your profile updated successfully!');
  }
}
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
