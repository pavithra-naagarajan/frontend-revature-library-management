import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { ToasterService } from 'src/app/services/toaster.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.css'],
})
export class UserChangePasswordComponent implements OnInit {
  passwordForm: FormGroup;
  user: Observable<User> | any;
  mailId?: string;
  errorMessage: string;
  newPassword?: string;

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
      this.passwordForm = this.formBuilder.group({
        password: [''],
        newPassword: ['', Validators.required],
      });
    });
  }

  changeUserPassword() {
    this.userService
      .changeUserPassword(
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
          this.toaster.error('Your old password is WRONG!!');
        }
      );
  }
}
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
