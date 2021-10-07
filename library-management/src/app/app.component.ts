import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from './services/toaster.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'library-management-system';

  constructor() {}
}
