import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'storyline';

  constructor(private authService: AuthService, private cookieService: CookieService, private router: Router) { }

  ngOnInit() {
    if (this.cookieService.get('user') !== '') {
      this.authService.user = JSON.parse(this.cookieService.get('user'));
    }
  }
}
