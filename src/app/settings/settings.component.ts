import { Component } from '@angular/core';

import { SECURITY_QUESTIONS } from '../constants';
import { AuthService } from '../services/auth/auth.service';
import Swal from 'ngx-angular8-sweetalert2';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  disableConfirmButton = true;
  securityQuestions = SECURITY_QUESTIONS;

  constructor(public authService: AuthService) { }

  public submitFeedback() {
    Swal.fire({
      title: '🚧 Feature Under Construction! 🚧',
      position: 'bottom-end',
      icon: 'warning',
      showConfirmButton: false,
      showCloseButton: true,
      timer: 3000,
      timerProgressBar: true,
      toast: true,
    });
  }

}
