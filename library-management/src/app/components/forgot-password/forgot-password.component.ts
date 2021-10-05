import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
errorMessage?:string;
  showTextbox?: boolean
  forgotPasswordForm?: FormGroup
  user:Observable<User>|any
  userId?: number
  constructor(public router: Router, public userService: UserService, public formBuilder: FormBuilder) { }
  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      mailId: ['', [Validators.required, Validators.email]]

    })
  }



  forgotPassword() {

    this.userService.forgotPassword(this.forgotPasswordForm.get('mailId')?.value).subscribe(data => {
      this.user=data
    
      this.passwordGeneration()
      this.router.navigate(['userlogin'])
    })


  }
  mailCheck(mailId: string) {



    this.userService.getUserByMailId(mailId).subscribe(data => {
      this.user = data
      if (this.user == null) {

        this.errorMessage = "You are not a registered User!"

      }
      else {
        this.errorMessage = ""
      }
    })
  }


  passwordGeneration() {
    Swal.fire('Success', 'Password generated succesfully!', 'success')
  }
  wrongGeneration() {
    Swal.fire('WRONG', 'You are not a registered user!', 'error')
  }

}
