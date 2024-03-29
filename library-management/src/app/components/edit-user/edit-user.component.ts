import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { ToasterService } from 'src/app/services/toaster.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  editUserForm: FormGroup;
  user: Observable<User> | any;
  mailId?: string;
  errorMessage: string;

  constructor(
    public router: Router,
    public userService: UserService,
    public formBuilder: FormBuilder,
    public toaster: ToasterService
  ) {}

  ngOnInit(): void {
    this.user = new User();
    this.mailId = localStorage.getItem('userEmail') as string;

    this.userService.getUserByMailId(this.mailId).subscribe((data) => {
      this.user = data;
      this.user = this.user.data;
      this.editUserForm = this.formBuilder.group({
        userId: [this.user.userId],
        firstName: [
          this.user.firstName,
          [Validators.required, Validators.minLength(3)],
        ],
        lastName: [this.user.lastName, [Validators.required]],
        password: [this.user.password, [Validators.required]],
        updatedOn: [this.user.updatedOn],
        gender: [this.user.gender, [Validators.required]],
        userRole: [this.user.userRole, [Validators.required]],
        status: [this.user.status],
        age: [this.user.age, [Validators.required, Validators.min(18)]],
        mobileNumber: [
          this.user.mobileNumber,
          [Validators.required, Validators.minLength(10)],
        ],
        mailId: [this.user.mailId, [Validators.required, Validators.email]],
        address: [this.user.address, [Validators.required]],
        createdOn: [this.user.createdOn],
      });
    });
  }

  updateUserDetails() {
    this.userService
      .updateUser(this.editUserForm?.value)
      .subscribe(async (response) => {
        this.successNotification();
        await delay(600);
        this.router.navigate(['userfunctions']);
      });
  }
  return() {
    this.router.navigate(['userfunctions']);
  }

  successNotification() {
    this.toaster.info('Your profile updated successfully!');
  }
}
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
