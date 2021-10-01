import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  addAdminForm?: FormGroup;
  constructor(public adminService: AdminService, public formBuilder: FormBuilder, public router: Router) { }

  ngOnInit(): void {
    this.addAdminForm = this.formBuilder.group({
      adminId: [-1],
      adminName: ['', Validators.required],
      adminRole: ['', Validators.required],
      mailId: ['', [Validators.required, Validators.email]],

    })
  }


  addAdminDetails() {
    this.adminService.addAdmin(this.addAdminForm?.value)
      .subscribe(
        response => {

        }, error => {
          this.successNotification();
          this.router.navigate(['superadmin'])
        })



  }
  return() {
    this.router.navigate(['superadmin'])
  }
  successNotification() {
    Swal.fire('Success', 'Admin Added Successfully!', 'success')
  }
}
