import { Component } from '@angular/core';

import Swal from 'ngx-angular8-sweetalert2';

import { SECURITY_QUESTIONS, TOAST } from '../constants';
import { AuthService, SLUser } from '../services/auth/auth.service';
import { EmailService } from '../services/email/email.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  user: SLUser;

  sendingFeedback = false;
  disableConfirmButton = true;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  securityQuestions = SECURITY_QUESTIONS;
  feedback: string = undefined;
  error = '';

  constructor(public authService: AuthService, public emailService: EmailService) {
    this.user = { ...authService.user };
  }

  async viewPatchNotes() {
    await Swal.fire({
      ...TOAST.BASE,
      title: '<span style="color: var(--text)">Patch Notes - 0.1.0</span>',
      html: `
      <span style="color: var(--text-secondary)">
        - This handy patch notes popup</br>
        - Dark Mode</br>
        - New Login/Registration Popups</br>
        - Various UI/UX improvements</br>
        - Various bugs squashed</br>
      </span>
      `,
      showConfirmButton: false,
      cancelButtonText: 'Close'
    });
  }

  public async updateAccount() {
    try {
      if (this.authService.user.nickname !== this.user.nickname) {
        await this.authService.updateNickname(this.user.email, this.user.nickname);

        this.authService.user = this.user;
        await this.authService.refreshCookie();
        this.user = { ...this.authService.user };

        Swal.fire(TOAST.SAVE_SUCCESS);
      }
    } catch (err) {
      console.log('There was an error saving your changes: ', err);
      Swal.fire(TOAST.SAVE_FAIL);
    }
  }

  public async updatePassword() {
    Swal.fire(TOAST.UNDER_CONSTRUCTION);
  }

  public updateSecurityQuestion() {
    Swal.fire(TOAST.UNDER_CONSTRUCTION);
  }

  public async submitFeedback() {
    this.sendingFeedback = true;

    try {
      await this.emailService.sendFeedback(this.user.id, this.feedback);
      Swal.fire(TOAST.FEEDBACK_SUCCESS);
    } catch (err) {
      console.log('There was an error submitting your feedback: ', err);
      Swal.fire({ ...TOAST.FEEDBACK_FAIL, text: err });
    }

    this.sendingFeedback = false;
  }

}
