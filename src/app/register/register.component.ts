import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: string;
  username: string;
  email: string;
  password: string;

  constructor(private validateService: ValidateService) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    // Required Fields
    if(!this.validateService.validateRegister(user)) {
      console.log('Please fill in all fields');
      return false;
    }
    // Validate Email
    if(!this.validateService.validateEmail(user.email)) {
      console.log('Please use a valid email');
      return false;
    }

    // Register user

  }
}
