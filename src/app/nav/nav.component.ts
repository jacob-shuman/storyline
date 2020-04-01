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
    private cookieService: CookieService,
    public alertService: AlertService,
    public authService: AuthService,
    public projectService: ProjectService,
    public characterService: CharacterService,
    public placeService: PlaceService,
    public objectService: ObjectService,
    public groupService: GroupService,
    public router: Router
  ) { }

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
