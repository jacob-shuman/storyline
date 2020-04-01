import { Component, OnInit } from '@angular/core';

import Typewriter from 'typewriter-effect/dist/core';
import Swal from 'ngx-angular8-sweetalert2';

import { HOME_TYPEWRITER_VERBS, HOME_TYPEWRITER_NOUNS, TOAST, SESSION_NAME, SESSION_EXPIRY_DAYS, SESSION_SECURE, SECURITY_QUESTIONS } from "../constants"
import { AuthService, SLLoginResult, SLRegisterResult } from '../services/auth/auth.service';
import { ProjectService } from '../services/project/project.service';
import { ValidateService } from '../services/validate/validate.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private typewriter: Typewriter;
  private typewriterStrings: string[];

  constructor(
    private projectService: ProjectService,
    public router: Router,
    public alertService: AlertService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.projectService.currentProject = undefined;
    this.typewriterStrings = [];

    const typewriterVariations = Math.floor(Math.random() * 200)

    for (let i = 0; i < typewriterVariations; ++i)
      this.typewriterStrings.push(`${HOME_TYPEWRITER_VERBS[Math.floor(Math.random() * HOME_TYPEWRITER_VERBS.length)]} ${HOME_TYPEWRITER_NOUNS[Math.floor(Math.random() * HOME_TYPEWRITER_NOUNS.length)]}`);


    this.typewriter = new Typewriter('#typewriter',
      {
        strings: this.typewriterStrings,
        autoStart: true,
        loop: true,
      }
    );

    this.typewriter.start();
  }
}
