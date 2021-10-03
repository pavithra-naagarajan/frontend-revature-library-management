import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from 'src/app/models/admin';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit {
  editAdminForm: FormGroup;
  admin?: Admin;
  adminId?: number;
  constructor(public router: Router, public adminService: AdminService, public activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.admin = new Admin()
    this.adminId = localStorage.getItem('adminId') as any;


    this.adminService.getAdminById(this.adminId)
      .subscribe(data => {
     
        this.admin = data

        this.editAdminForm = this.formBuilder.group({
          adminId: [this.admin.adminId],
          adminName: [this.admin.adminName, [Validators.required]],

          adminPassword: [this.admin.adminPassword, [Validators.required]],
          adminRole: [this.admin.adminRole],
          updatedOn:[this.admin.updatedOn],
          createdOn:[this.admin.createdOn],
          mailId: [this.admin.mailId, [Validators.required, Validators.email]],

        })
      })
  }


  updateAdminDetails() {
    this.adminService.updateAdmin(this.editAdminForm?.value)
      .subscribe(
        response => {

          this.successNotification()
          this.router.navigate(['adminfunctions'])

        });
  }
  return() {
    this.router.navigate(['adminfunctions'])
  }


  successNotification() {
    Swal.fire('Success', 'Admin details are Updated Successfully!..', 'success')
  }

}
