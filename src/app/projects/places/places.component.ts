import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProjectService, SLPlace } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {
  places: SLPlace[];
  loadingPlaces = true;

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
    }

    this.loadingPlaces = false;
  }

}
