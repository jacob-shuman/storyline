import { Component } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string;
  password: string;
  repeatPassword: string;
  nickName: string;
  securityQuestion: string;
  securityAnswer: string;

  constructor(private validateService: ValidateService, private authService: AuthService, private router: Router) { }

  async onRegisterSubmit() {
    const user = {
      email: this.email,
      password: this.password,
      repeatPassword: this.repeatPassword,
      nickName: this.nickName,
      securityQuestion: this.securityQuestion,
      securityAnswer: this.securityAnswer,
    };

    // Required Fields
    if (!this.validateService.validateRegister(user)) {
      console.log('Please fill in all fields');
      return false;
    }
    // Validate Email
    if (!this.validateService.validateEmail(user.email)) {
      console.log('Please use a valid email');
      return false;
    }

    try {
      if (await this.authService.register(this.nickName, this.email, this.password, this.securityQuestion, this.securityAnswer)) {
        this.router.navigate(['login']);
      }
    } catch (error) {
      console.log('Error: ' + error);
    }

  }
}
