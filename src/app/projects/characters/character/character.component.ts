import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'ngx-angular8-sweetalert2';

import { SLCharacter, CharacterService, SLUpdateCharacterResult } from 'src/app/services/character/character.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { TOAST } from 'src/app/constants';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {
  character: SLCharacter;
  loadingCharacter = true;

  constructor(public router: Router, public projectService: ProjectService, public characterService: CharacterService) { }

  async ngOnInit() {
    await this.loadProject();

    try {
      await this.characterService.getCharacters(this.projectService.currentProject.id);
      this.characterService.currentCharacter = await this.characterService.getCharacterById(
        this.projectService.currentProject.id,
        this.router.parseUrl(this.router.url).root.children.primary.segments[3].path
      );

      this.character = { ...this.characterService.currentCharacter };
    } catch (err) {
      this.router.navigate(['projects', this.projectService.currentProject.id, 'characters']);
    }

    this.loadingCharacter = false;
  }

  async loadProject() {
    if (!this.projectService.currentProject) {
      const projectId = this.router.parseUrl(this.router.url).root.children.primary.segments[1].path;

      try {
        this.projectService.currentProject = await this.projectService.getProjectById(projectId);
      } catch (err) {
        this.router.navigate(['projects']);
      }
    }
  }

  public validateFields(): boolean {
    if (!this.character.name || this.character.name.trim() === '') {
      return false;
    }

    if (!this.character.description || this.character.description.trim() === '') {
      return false;
    }

    if (
      (this.character.name === this.characterService.currentCharacter.name) &&
      (this.character.description === this.characterService.currentCharacter.description)) {
      return false;
    }

    return true;
  }

  public async updateCharacter(): Promise<void> {
    this.loadingCharacter = true;

    try {
      const result: SLUpdateCharacterResult = await this.characterService.updateCharacter(this.character);

      if (result.success) {
        await this.characterService.getCharacters(this.projectService.currentProject.id, true);
        this.router.navigate(['project', this.character.projectId, 'characters']);
      } else if (result.error) {
        throw result.error;
      }
      Swal.fire({ ...TOAST.SUCCESS, title: `<span style="color: var(--text)"> "${this.character.name}" was created successfully!</span` });

    } catch (error) {
      Swal.fire({ ...TOAST.FAIL, title: `<span style="color: var(--text)">There was an error updating "${this.character.name}" :(</span>`, text: error });
    }

    this.loadingCharacter = true;
  }
}
