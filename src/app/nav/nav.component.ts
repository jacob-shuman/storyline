import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

import Swal from 'ngx-angular8-sweetalert2';

import { AuthService, SLLoginResult, SLRegisterResult } from '../services/auth/auth.service';
import { ProjectService } from '../services/project/project.service';
import { TOAST, SESSION_NAME, SESSION_EXPIRY_DAYS, SESSION_SECURE, SECURITY_QUESTIONS } from '../constants';
import { ValidateService } from '../services/validate/validate.service';
import { CharacterService } from '../services/character/character.service';
import { PlaceService } from '../services/place/place.service';
import { GroupService } from '../services/group/group.service';
import { ObjectService } from '../services/object/object.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(
    private alertService: AlertService,
    private cookieService: CookieService,
    public authService: AuthService,
    public projectService: ProjectService,
    public characterService: CharacterService,
    public placeService: PlaceService,
    public objectService: ObjectService,
    public groupService: GroupService,
    public router: Router
  ) { }

  // async login() {
  //   const credentials = await Swal
  //     .mixin({
  //       ...TOAST.BASE,
  //       title: '<span style="color: var(--text)">Login</span>',
  //       progressSteps: ['1', '2']
  //     })
  //     .queue([
  //       {
  //         confirmButtonText: 'Next',
  //         input: 'email',
  //         inputPlaceholder: 'Email',
  //         inputValidator: async (value: string) => {
  //           return !this.validateService.validateEmail(value) ? 'Invalid Email' : false;
  //         }
  //       },
  //       {
  //         confirmButtonText: 'Submit',
  //         input: 'password',
  //         inputPlaceholder: 'Password',
  //         inputValidator: async (value: string) => {
  //           return !value ? 'Invalid Password' : false;
  //         }
  //       }
  //     ]);

  //   if (credentials.value) {
  //     try {
  //       const result: SLLoginResult = await this.authService.login(credentials.value[0], credentials.value[1]);

  //       if (result.success) {
  //         this.authService.user = {
  //           id: result.user._id,
  //           email: result.user.Email,
  //           password: result.user.Password,
  //           nickname: result.user.Nickname,
  //           securityQuestion: result.user.Security_Question,
  //           securityAnswer: result.user.Security_Answer,
  //           lastFailedLogin: result.user.Last_Failed_Login,
  //           lastFeedback: result.user.Last_Feedback,
  //           userSettings: result.user.User_Settings,
  //           authenticated: result.user.Authenticated
  //         };

  //         this.cookieService.set(
  //           SESSION_NAME,
  //           JSON.stringify(this.authService.user),
  //           SESSION_EXPIRY_DAYS,
  //           undefined,
  //           undefined,
  //           SESSION_SECURE
  //         );

  //         Swal.fire(TOAST.LOGIN_SUCCESS);
  //         this.router.navigate(['projects']);
  //       } else if (result.error) {
  //         throw result.error;
  //       }
  //     } catch (error) {
  //       await Swal.fire({
  //         ...TOAST.FAIL,
  //         title: '<span style="color: var(--text)">Incorrect Email/Password Combination</span>'
  //       });
  //     }
  //   } else if (credentials.dismiss) {
  //     await Swal.fire({
  //       ...TOAST.FAIL,
  //       title: '<span style="color: var(--text)">Login Aborted</span>'
  //     });
  //   }
  // }

  // async register() {
  //   let password = '';

  //   const credentials = await Swal
  //     .mixin({
  //       ...TOAST.BASE,
  //       title: '<span style="color: var(--text)">Register</span>',
  //       progressSteps: ['1', '2', '3', '4', '5', '6']
  //     })
  //     .queue([
  //       {
  //         confirmButtonText: 'Next',
  //         input: 'text',
  //         inputPlaceholder: 'Nickname',
  //         inputValidator: async (value: string) => {
  //           return !value ? 'Nickname cannot be empty' : false;
  //         }
  //       },
  //       {
  //         confirmButtonText: 'Next',
  //         input: 'email',
  //         inputPlaceholder: 'Email',
  //         inputValidator: async (value: string, asdf: any) => {
  //           return !this.validateService.validateEmail(value) ? 'Invalid Email' : false;
  //         }
  //       },
  //       {
  //         ...TOAST.BASE,
  //         confirmButtonText: 'Next',
  //         input: 'password',
  //         inputPlaceholder: 'Password',
  //         inputValidator: async (value: string) => {
  //           let error: string;

  //           if (value.trim().length < 8 || value.trim().length > 32) {
  //             error = 'Passwords must be between 8 - 32 characters';
  //           } else if (!(/^.*[0-9].*$/.test(value.trim()))) {
  //             error = 'Passwords must contain at least 1 number';
  //           } else if (!(/^.*[a-zA-Z].*$/.test(value.trim()))) {
  //             error = 'Passwords must contain at least 1 letter';
  //           } else if (!(/^.*[^a-zA-Z0-9].*$/.test(value.trim()))) {
  //             error = 'Passwords must contain at least special character';
  //           }
  //           return error;
  //         },
  //         preConfirm: (value: string) => {
  //           password = value;
  //         }
  //       },
  //       {
  //         ...TOAST.BASE,
  //         confirmButtonText: 'Next',
  //         input: 'password',
  //         inputPlaceholder: 'Repeat Password',
  //         inputValidator: async (value: string) => {
  //           return value !== password ? 'Passwords do not match' : false;
  //         },
  //       },
  //       {
  //         ...TOAST.BASE,
  //         confirmButtonText: 'Next',
  //         input: 'select',
  //         inputPlaceholder: 'Security Question',
  //         inputOptions: SECURITY_QUESTIONS,
  //         inputValidator: async (value: string) => {
  //           return !value ? 'Please select a security question' : false;
  //         },
  //       },
  //       {
  //         confirmButtonText: 'Submit',
  //         input: 'text',
  //         inputPlaceholder: 'Security Question Answer',
  //         inputValidator: async (value: string) => {
  //           return !value ? 'Security answer cannot be empty' : false;
  //         }
  //       },
  //     ]);

  //   if (credentials.value) {
  //     try {
  //       const result: SLRegisterResult = await this.authService.register(
  //         credentials.value[0],
  //         credentials.value[1],
  //         credentials.value[2],
  //         credentials.value[4],
  //         credentials.value[5]
  //       );

  //       if (result.success) {
  //         this.login();
  //       } else if (result.error) {
  //         throw result.error;
  //       }
  //     } catch (error) {
  //       await Swal.fire({
  //         ...TOAST.FAIL,
  //         title: `<span style="color: var(--text)">Error ${error}</span>`
  //       });
  //     }
  //   } else if (credentials.dismiss) {
  //     await Swal.fire({
  //       ...TOAST.FAIL,
  //       title: '<span style="color: var(--text)">Registration Aborted</span>'
  //     });
  //   }
  // }

  signout() {
    this.authService.user = undefined;
    this.cookieService.delete(SESSION_NAME);

    this.projectService.clearProjects();
    this.characterService.clearCharacters();
    this.placeService.clearPlaces();
    this.objectService.clearObjects();
    this.groupService.clearGroups();

    this.router.navigate(['/']);
  }
}
