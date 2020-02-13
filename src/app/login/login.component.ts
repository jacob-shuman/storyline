import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { ValidateService } from '../services/validate.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string;
  password: string;

  errors: {
    all: string, // Errors regarding login in general
    email: string, // Errors regarding entered email
    password: string // Errors regarding entered password
  };

  constructor(private validateService: ValidateService, private authService: AuthService, private router: Router) {
    this.errors = {
      all: '',
      email: '',
      password: ''
    };
  }

  /**
   * @returns Whether email/password fields are valid
   */
  private validateFields(): boolean {
    let valid = true;

    if (!this.validateService.validateEmail(this.email)) {
      this.errors.email = 'Invalid Email';
      valid = false;
    }

    if (!this.password) {
      this.errors.password = 'Invalid Password';
      valid = false;
    }

    return valid;
  }

  private async onLoginSubmit(): Promise<void> {
    this.errors = { all: '', email: '', password: '' };
    if (this.validateFields()) {
      try {
        if (await this.authService.login(this.email, this.password)) {
          this.router.navigate(['projects']);
        }
      } catch (error) {
        this.errors.all = error.message;
      }
    }
  }

}
