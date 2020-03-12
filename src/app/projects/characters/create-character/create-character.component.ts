import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'ngx-angular8-sweetalert2';

import { ProjectService, SLCharacter } from 'src/app/services/project/project.service';
import { TOAST } from 'src/app/constants';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.css']
})
export class CreateCharacterComponent implements OnInit {
  loadingProject = true;
  character: SLCharacter;

  constructor(private router: Router, public projectService: ProjectService) { }

  ngOnInit() {
    this.loadProject();
  }

  async loadProject() {
    if (!this.projectService.currentProject) {
      const projectId = this.router.parseUrl(this.router.url).root.children.primary.segments[1];

      try {
        this.projectService.currentProject = await this.projectService.getProjectsById(projectId.path);
      } catch (err) {
        this.router.navigate(['projects']);
      }
    }

    this.character = {
      id: '',
      name: '',
      description: '',
      projectId: this.projectService.currentProject.id
    };

    this.loadingProject = false;
  }

  public validateFields(): boolean {
    if (!this.character.name || this.character.name.trim() === '') {
      return false;
    }

    if (!this.character.description || this.character.description.trim() === '') {
      return false;
    }

    return true;
  }

  public createCharacter(): void {
    Swal.fire(TOAST.UNDER_CONSTRUCTION);
  }

}
