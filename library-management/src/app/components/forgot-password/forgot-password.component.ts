import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from 'src/app/models/user';
import { ToasterService } from 'src/app/services/toaster.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  errorMessage?: string;
  showTextbox?: boolean;
  forgotPasswordForm?: FormGroup;
  user: Observable<User> | any;
  userId?: number;
  constructor(
    public router: Router,
    public userService: UserService,
    public formBuilder: FormBuilder,
    public toaster: ToasterService
  ) {}
  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      mailId: ['', [Validators.required, Validators.email]],
    });
  }

  forgotPassword() {
    this.userService
      .forgotPassword(this.forgotPasswordForm.get('mailId')?.value)
      .subscribe(async (data) => {
        this.user = data;

        this.passwordGeneration();
        await delay(1000);
        this.router.navigate(['userlogin']);
      });
  }
  mailCheck(mailId: string) {
    this.userService.getUserByMailId(mailId).subscribe(
      (data) => {
        this.user = data;

        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = 'You are not a registered User!';
      }
    );
  }

  passwordGeneration() {
    this.toaster.success('Password generated succesfully!');
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
