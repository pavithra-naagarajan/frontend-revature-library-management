import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-superadmin-dashboard',
  templateUrl: './superadmin-dashboard.component.html',
  styleUrls: ['./superadmin-dashboard.component.css']
})
export class SuperadminDashboardComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }
  viewAdmins() {
    this.router.navigate(['viewadmins'])
  }
  addAdmins() {
    this.router.navigate(['addadmin'])

  }
  logout() {
    this.router.navigate(['login'])

  }

}
