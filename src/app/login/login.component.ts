import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, SLLoginResult, SLUser } from '../services/auth/auth.service';
import { ValidateService } from '../services/validate/validate.service';


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

  async onLoginSubmit(): Promise<void> {
    this.errors = { all: '', email: '', password: '' };
    if (this.validateFields()) {
      try {
        const result: SLLoginResult = await this.authService.login(this.email, this.password);
        
        if (result.success) {
          this.authService.user = {
            id: result.user._id,
            email: result.user.Email,
            password: result.user.Password,
            nickName: result.user.NickName,
            securityQuestion: result.user.Security_Question,
            securityAnswer: result.user.Security_Answer,
            lastFailedLogin: result.user.Last_Failed_Login,
            lastFeedback: result.user.Last_Feedback,
            userSettings: result.user.User_Settings,
            authenticated: result.user.Authenticated
          };

          this.router.navigate(['projects']);
        } else if (result.error) {
          throw result.error;
        }
      } catch (error) {
        this.errors.all = error;
      }
    }
  }

}
