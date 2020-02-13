import { Component } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { AuthService, RegisterResult } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  errors: {
    all: string, // Errors regarding registration in general
    email: string, // Errors regarding entered email
    password: string // Errors regarding entered password
    repeatPassword: string // Errors regarding entered repeated password
    nickName: string; // Errors regarding entered nickname
    securityQuestion: string; // Errors regarding entered security question
    securityAnswer: string; // Errors regarding entered security answer
  };

  email: string;
  password: string;
  repeatPassword: string;
  nickName: string;
  securityQuestion: string;
  securityAnswer: string;

  constructor(private validateService: ValidateService, private authService: AuthService, private router: Router) { }


  /**
   * @returns Whether all registration fields are valid
   */
  validateFields(): boolean {
    let valid = true;

    const user = {
      email: this.email,
      password: this.password,
      repeatPassword: this.repeatPassword,
      nickName: this.nickName,
      securityQuestion: this.securityQuestion,
      securityAnswer: this.securityAnswer,
    };

    this.errors = {
      all: '',
      email: '',
      password: '',
      repeatPassword: '',
      nickName: '',
      securityQuestion: '',
      securityAnswer: ''
    };

    // Required Fields
    if (!this.validateService.validateRegister(user)) {
      this.errors.all = 'Please fill in all fields';
      valid = false;
    }

    if (user.password !== user.repeatPassword) {
      this.errors.password = 'Passwords do not match';
      valid = false;
    } else if (user.password.trim().length < 8 || user.password.trim().length > 32) {
      this.errors.password = 'Passwords must be between 8 - 32 characters';
      valid = false;
    } else if (!(/^.*[0-9].*$/.test(user.password.trim()))) {
      this.errors.password = 'Passwords must contain at least 1 number';
      valid = false;
    } else if (!(/^.*[a-zA-Z].*$/.test(user.password.trim()))) {
      this.errors.password = 'Passwords must contain at least 1 letter';
      valid = false;
    } else if (!(/^.*[^a-zA-Z0-9].*$/.test(user.password.trim()))) {
      this.errors.password = 'Passwords must contain at least special character';
      valid = false;
    }

    // Validate Email
    if (!this.validateService.validateEmail(user.email)) {
      this.errors.email = 'Please use a valid email';
      valid = false;
    }

    return valid;
  }

  async onRegisterSubmit() {
    this.errors = {
      all: '',
      email: '',
      password: '',
      repeatPassword: '',
      nickName: '',
      securityQuestion: '',
      securityAnswer: ''
    };

    if (this.validateFields()) {
      try {
        const result: RegisterResult = await this.authService.register(this.nickName, this.email, this.password, this.securityQuestion, this.securityAnswer);

        if (result.success) {
          this.router.navigate(['login']);
        } else if (result.error) {
          throw result.error;
        }
      } catch (error) {
        console.log('Error: ' + error);
        this.errors.all = error;
      }
    }

  }
}
