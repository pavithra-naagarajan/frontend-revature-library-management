import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Admin } from 'src/app/models/admin';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-admins',
  templateUrl: './view-admins.component.html',
  styleUrls: ['./view-admins.component.css'],
})
export class ViewAdminsComponent implements OnInit {
  show?: boolean;
  admins: Observable<Admin[]> | any;
  config: any;
  constructor(
    public router: Router,
    public adminService: AdminService,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.viewAdmins();
  }
  pageChanged(event: any) {
    this.config.currentPage = event;
  }
  viewAdmins() {
    this.adminService.getAllAdmins().subscribe((data: any[]) => {
      this.show = true;
      this.admins = data;
      this.admins = this.admins.data;

      this.config = {
        itemsPerPage: 3,
        currentPage: 1,
        totalItems: this.admins.count,
      };
    });
  }

  deleteAdmin(adminId: number) {
    this.adminService.deleteAdmin(adminId).subscribe((res: any) => {});
  }

  deleteAlertConfirmation(adminId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        this.deleteAdmin(adminId);
        Swal.fire('Removed!', 'Admin deleted successfully!', 'success');
        this.viewAdmins();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Admin Not Deleted!', 'error');
      }
    });
  }
}
