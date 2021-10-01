import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  showTextbox?: boolean
  forgotPasswordForm?: FormGroup
  user?: User
  userId?: number
  constructor(public router: Router, public userService: UserService, public formBuilder: FormBuilder) { }
  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      mailId: ['', [Validators.required, Validators.email]]

    })
  }



  forgotPassword() {

    this.userService.forgotPassword(this.forgotPasswordForm.get('mailId')?.value).subscribe(data => {
      if (data == null) {
        this.wrongGeneration()
      }
      this.passwordGeneration()
      
      this.router.navigate(['userlogin'])
    }, error => {
      this.passwordGeneration()

      this.router.navigate(['userlogin'])
    })


  }


  passwordGeneration() {
    Swal.fire('Success', 'Password generated succesfully!', 'success')
  }
  wrongGeneration() {
    Swal.fire('WRONG', 'You are not a registered user!', 'error')
  }

}
