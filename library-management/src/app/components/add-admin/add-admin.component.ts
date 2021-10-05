import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  addAdminForm?: FormGroup;
  constructor(public adminService: AdminService, public formBuilder: FormBuilder, 
    public router: Router,public toaster:ToasterService) { }

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
        async response => {
          this.success()
         
         this.addAdminForm.reset()
        })



  }
  return() {
    this.router.navigate(['superadmin'])
  }
 
  success() {
    this.toaster.success("Admin Addded successfully!")
   }
}
