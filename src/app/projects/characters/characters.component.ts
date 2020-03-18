import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProjectService } from 'src/app/services/project/project.service';
import { SLCharacter, CharacterService } from 'src/app/services/character/character.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  loadingCharacters = true;

  constructor(private router: Router, public projectService: ProjectService, public characterService: CharacterService) { }

  async ngOnInit() {
    await this.loadProject();

    try {
      await this.characterService.getCharacters(this.projectService.currentProject.id);
    } catch (err) {
      console.error(err);
    }

    this.loadingCharacters = false;
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
  }
}
