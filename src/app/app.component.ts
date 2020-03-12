import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

import { AuthService } from './services/auth/auth.service';
import { SESSION_NAME, SESSION_EXPIRY_DAYS, SESSION_SECURE } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'storyline';

  constructor(private authService: AuthService, private cookieService: CookieService, private router: Router) { }

  ngOnInit() {
    this.updateUser();
  }

  async updateUser() {
    if (this.cookieService.check('user')) {
      try {
        this.authService.user = JSON.parse(this.cookieService.get('user'));
        
        this.authService.user = await this.authService.getUser(this.authService.user.id, this.authService.user.password);
        
        this.cookieService.delete('user')
        this.cookieService.set(SESSION_NAME, JSON.stringify(this.authService.user), SESSION_EXPIRY_DAYS, undefined, undefined, SESSION_SECURE);
      } catch(err) {
        console.log("Internal Error Occurred: ", err);
        this.cookieService.delete('user');
      }
    } else {
      this.cookieService.delete('user');
    }
  }
}
