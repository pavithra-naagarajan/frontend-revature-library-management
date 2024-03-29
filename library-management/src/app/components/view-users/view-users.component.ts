import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { ToasterService } from 'src/app/services/toaster.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css'],
})
export class ViewUsersComponent implements OnInit {
  show?: boolean;
  users: Observable<User[]> | any;
  userRole?: string;
  config: any;
  value?: string;
  searchBy: String = 'default';
  textValue: any = null;
  errorMessage?: string;
  count?: number;
  searchUserForm?: FormGroup;
  adminId?: number;
  constructor(
    public router: Router,
    public userService: UserService,
    public formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute,
    public toaster: ToasterService
  ) {}

  ngOnInit(): void {
    this.adminId = localStorage.getItem('adminId') as any;

    this.viewUsers();

    this.searchUserForm = this.formBuilder.group({
      value: ['', Validators.required],
    });
  }

  viewUsers() {
    this.userService.getAllUsers().subscribe(
      (data: any[]) => {
        this.users = data;
        this.users = this.users.data;
        this.show = true;
        this.count = this.users.length;
        console.log(this.count);
        this.config = {
          itemsPerPage: 3,
          currentPage: 1,
          totalItems: this.users.count,
        };

        this.errorMessage = '';
      },
      (error) => {
        this.show = false;
        this.errorMessage = error.error.message;
      }
    );
  }

  pageChanged(event: any) {
    this.config.currentPage = event;
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe((res: any) => {});
  }

  deleteAlertConfirmation(userId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        this.deleteUser(userId);
        this.viewUsers();

        Swal.fire('Removed!', 'User deleted successfully!', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'User Not Deleted!', 'error');
      }
    });
  }

  searchUser() {
    if (this.textValue == '') {
      this.viewUsers();
    } else {
      this.userService
        .searchUser(this.searchUserForm.get('value')?.value)
        .subscribe(
          (data: any[]) => {
            this.users = data;
            this.users = this.users.data;

            this.show = true;
            this.errorMessage = '';
          },
          (error) => {
            this.show = false;
            this.errorMessage = error.error.message;
          }
        );
    }
  }

  notification() {
    this.toaster.error('You cannot delete Active user!');
  }
}
