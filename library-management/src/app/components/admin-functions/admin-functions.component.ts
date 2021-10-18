import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-functions',
  templateUrl: './admin-functions.component.html',
  styleUrls: ['./admin-functions.component.css'],
})
export class AdminFunctionsComponent implements OnInit {
  adminId?: number;

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.adminId = localStorage.getItem('adminId') as any;
  }

  viewAdminProfile() {
    this.router.navigate(['editadmin']);
  }
  viewUsers() {
    this.router.navigate(['viewusers']);
  }
  viewBooks() {
    this.router.navigate(['viewbooks']);
  }
  addBooks() {
    this.router.navigate(['addbooks']);
  }
  viewRequest() {
    this.router.navigate(['viewrequest']);
  }
  viewIssuedDetails() {
    this.router.navigate(['viewissuedbooks']);
  }
  changeAdminPassword() {
    this.router.navigate(['changeadminpassword']);
  }
  logout() {
    localStorage.removeItem('adminEmail');

    this.router.navigate(['login']);
  }
}
