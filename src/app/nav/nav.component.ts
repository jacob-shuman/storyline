import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

import { AuthService } from '../services/auth/auth.service';
import { ProjectService } from '../services/project/project.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(private cookieService: CookieService, public authService: AuthService, public projectService: ProjectService, public router: Router) { }

  signout() {
    this.authService.user = undefined;
    this.cookieService.delete('user');
    this.router.navigate(['/']);
  }

}
