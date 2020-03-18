import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'ngx-angular8-sweetalert2';

import { TOAST } from 'src/app/constants';
import { SLCharacter, SLCreateCharacterResult, CharacterService } from 'src/app/services/character/character.service';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.css']
})
export class CreateCharacterComponent implements OnInit {
  loadingProject = true;
  loadingCharacter = false;
  character: SLCharacter;

  constructor(private router: Router, public projectService: ProjectService, public characterService: CharacterService) { }

  ngOnInit() {
    this.loadProject();
  }

  async loadProject() {
    if (!this.projectService.currentProject) {
      const projectId = this.router.parseUrl(this.router.url).root.children.primary.segments[1];

      try {
        this.projectService.currentProject = await this.projectService.getProjectById(projectId.path);
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

  public async createCharacter(): Promise<void> {
    this.loadingCharacter = true;

    try {
      const result: SLCreateCharacterResult = await this.characterService.createCharacter(this.character);

      if (result.success) {
        await this.characterService.getCharacters(this.projectService.currentProject.id, true);
        this.router.navigate(['project', this.character.projectId, 'characters']);
      } else if (result.error) {
        throw result.error;
      }
      Swal.fire({ ...TOAST.SUCCESS, title: `"${this.character.name}" was created successfully!` });

    } catch (error) {
      Swal.fire({ ...TOAST.FAIL, title: `There was an error creating "${this.character.name}" :(`, text: error });
    }

    this.loadingCharacter = true;
  }
}
