import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {
  signupForm?: FormGroup;
  errorMessage?: String

  user?: User;
  mailUser?: User
  mobileUser?: User
  constructor(public activatedRoute: ActivatedRoute, public userService: UserService, public formBuilder: FormBuilder,
    public router: Router) { }

  ngOnInit(): void {
    this.user = new User();

    this.signupForm = this.formBuilder.group({
      userId: [-1,],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      userRole: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.minLength(18)]],
      mobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      mailId: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]]
    },
      {
        validator: ConfirmedValidator('password', 'confirmPassword'),

      })
  }

  mailCheck(mailId: string) {



    this.userService.getUserByMailId(mailId).subscribe(data => {
      this.mailUser = data
      if (this.mailUser == null) {

        this.errorMessage = ""

      }
      else {
        this.errorMessage = "*** MailId already exists!"
      }
    })
  }

  mobileCheck(mobileNumber: string) {
    this.userService.getUserByMobileNumber(mobileNumber).subscribe(data => {
      this.mobileUser = data
      if (this.mobileUser == null) {
        this.errorMessage = ""


      }
      else {
        this.errorMessage = "*** Mobile Number already exists!"
      }
    })
  }

  userSignUp() {

    this.userService.addUser(this.signupForm?.value)
      .subscribe(
        response => {

          this.user = response

          this.successNotification()
          this.router.navigate(['login'])
        })

  }

  return() {
    this.router.navigate(['login'])
  }
  successNotification() {
    Swal.fire('Success', 'User Account created Successfully!', 'success')
  }

}


function ConfirmedValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}


