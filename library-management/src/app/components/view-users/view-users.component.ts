import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
interface Search {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
show?:boolean;
users:Observable<User>|any
userRole?:string;

value?:string
searchBy:String = "default";
textValue:any=null;
errorMessage?:string


searchUserForm?:FormGroup
adminId?:number
constructor(public router:Router,public userService:UserService,public formBuilder:FormBuilder,public activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.adminId = localStorage.getItem('adminId') as any;

    this.viewUsers()

    this.searchUserForm = this.formBuilder.group({
      value: ['', Validators.required]
    })

    
    
   
  }
  
  viewUsers() {
    this.userService.getAllUsers().subscribe(
      (res:any)=>{
       this.show=true
        this.users=res
        this.users=this.users.res
     }
    )}  

    notification(){
      Swal.fire('WRONG', 'You cannot delete Active User!', 'error')    
    }
   

    return(){
this.router.navigate(['adminfunctions'])
    }
    deleteUser(userId:number){
      this.userService.deleteUser(userId).subscribe(
        (res:any)=>{
        
          });
    }

    deleteAlertConfirmation(userId:number){
      Swal.fire({
        title: 'Are you sure?',
        text: 'This process is irreversible.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, go ahead.',
        cancelButtonText: 'No, let me think'
      }).then((result) => {
        if (result.value) {
          this.deleteUser(userId)
          this.viewUsers()
          Swal.fire(
            'Removed!',
            'User deleted successfully!',
            'success'
            
          )
        
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'User Not Deleted!',
            'error'
          )
        }
      })
    } 
    
    getUserByRole(event : any){
      if(this.userRole == "any"){
        this.viewUsers()
      }
      else{
        this.userService.getUserByRole(this.userRole).subscribe((data:any[])=>{
        
          this.users=data;
          this.users= this.users.data
          if(this.users.length==0){
            this.errorMessage = "No records found"
          }
          else{
          this.errorMessage = ""
          }
          }
        )
      }
    }
    searchUser() {
      if (this.textValue == "") {
        this.viewUsers()
      }
  
      else {
        this.userService.searchUser(this.searchUserForm.get('value')?.value).subscribe((data: any[]) => {
 
          this.users = data;
          this.users =this.users.data
          if (this.users == null) {
            this.errorMessage = "No records found"
          }
          else {
            this.errorMessage = ""
          }
        }
        )
      }
    }
    
  
}
