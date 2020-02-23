import { Component } from '@angular/core';

import { SESSION_NAME, SECURITY_QUESTIONS } from '../constants';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  disableConfirmButton = true;
  securityQuestions = SECURITY_QUESTIONS;

  constructor(private authService: AuthService) { }

}
