import { Component, OnInit } from '@angular/core';

import { SLCharacter, ProjectService } from 'src/app/services/project/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  characters: SLCharacter[];
  loadingCharacters = true;

  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit() {
    this.loadProject();
  }

  async loadProject() {
    if (!this.projectService.currentProject) {
      const projectId = this.router.parseUrl(this.router.url).root.children.primary.segments[1];

      try {
        this.projectService.currentProject = await this.projectService.getProjectsById(projectId.path);
      } catch(err) {
        this.router.navigate(['projects']);
      }

      // this.projectService.currentProject = 
    }

    this.loadingCharacters = false;
  }

}
